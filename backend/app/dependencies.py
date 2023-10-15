import json
import random
import uuid
from json import JSONDecodeError
from typing import Annotated, Union, Literal, List
from base64 import urlsafe_b64encode as b64_enc, urlsafe_b64decode as b64_dec

import httpx
from fastapi import Cookie, Depends, Body, Path
from redis.asyncio import Redis
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from starlette.requests import Request

from .redis_crud import create_user, get_user, add_to_queue, rm_from_queue, \
    get_queue_count
from .sql_crud import get_departments_by_params, get_atms_by_params, get_all_cities, get_atms_by_ids, get_departments_by_ids
from config import REDIS_HOST, REDIS_PORT, ANALYTICS_URL
from schemas import Office, BaseOffice, BaseAtm, Atm, ItemTime

from database import get_async_session


redis = Redis(host=REDIS_HOST, port=REDIS_PORT)

dep_operations = ['Получить выписку',
                  'Оформить кредит',
                  'Закрыть лицевой счет',
                  'Открыть лицевой счет']

atm_operations = ['Снять наличные',
                  'Оплатить коммунальные услуги',
                  'Погасить задолженность']


async def get_optional_deps(items: List[ItemTime]):
    params = []
    for item in items:
        data = item.model_dump()
        data.update({'queueLength': await get_queue_count(redis, 'dep:', item.id)})
        params.append(data)
    content = json.dumps(params)
    headers = {'Content-Type': 'application/json'}
    resp = httpx.post(url=ANALYTICS_URL, headers=headers, content=content)
    return resp.json()


async def get_optional_atms(items: List[ItemTime]):
    params = []
    for item in items:
        data = item.model_dump()
        data.update({'queueLength': await get_queue_count(redis, 'atm:', item.id)})
        params.append(data)
    content = json.dumps(params)
    headers = {'Content-Type': 'application/json'}
    resp = httpx.post(url=ANALYTICS_URL, headers=headers, content=content)
    return resp.json()


async def query_to_str(request: Request):
    return request.query_params


async def del_from_atm_queue(
        ticket: Annotated[str, Path()]
):
    try:

        payload = json.loads(b64_dec(ticket).decode('utf-8'))
        if 'id' not in payload.keys():
            return False
        ex_ticket = await rm_from_queue(redis,
                                        prefix='atm:',
                                        id=payload['id'],
                                        ticket=ticket)
        if ex_ticket:
            return payload
        return False
    except JSONDecodeError:
        return False


async def del_from_dep_queue(
        ticket: str
        # ticket: Annotated[str, Path()]
):
    try:

        payload = json.loads(b64_dec(ticket).decode('utf-8'))
        if 'id' not in payload.keys():
            print('id not found in payload')
            return False
        ex_ticket = await rm_from_queue(redis,
                                        prefix='dep:',
                                        id=payload['id'],
                                        ticket=ticket)
        if ex_ticket:
            return payload
        print('ticket doesnt exist')
        return False
    except JSONDecodeError:
        print('decode error')
        return False


async def add_to_atm_queue(
        atm_id: Annotated[int, Body(embed=True)],
        # operation: Annotated[str, Body(embed=True)],
        exp_time: Annotated[int, Body(embed=True)] = None,
):
    payload = {
        'uid': uuid.uuid4().hex,
        'id': atm_id,
        'op': random.choice(atm_operations),
        'exp_time': exp_time
    }
    ticket = b64_enc(json.dumps(payload).encode('utf-8')).decode('utf-8')
    await add_to_queue(redis, prefix='atm:', id=atm_id, ticket=ticket)
    return ticket


async def add_to_dep_queue(
        department_id: Annotated[int, Body(embed=True)],
        # operation: Annotated[str, Body(embed=True)],
        exp_time: Annotated[int, Body(embed=True)] = None,
):
    payload = {
        'uid': uuid.uuid4().hex,
        'id': department_id,
        'op': random.choice(dep_operations),
        'exp_time': exp_time
    }
    ticket = b64_enc(json.dumps(payload).encode('utf-8')).decode('utf-8')
    await add_to_queue(redis, prefix='dep:', id=department_id, ticket=ticket)
    return ticket


async def get_cities(
        query: str = Depends(query_to_str),
        db: AsyncSession = Depends(get_async_session)
):
    return await get_all_cities(db)


async def get_atms_by(
        atm: BaseAtm = Depends(),
        query: str = Depends(query_to_str),
        db: AsyncSession = Depends(get_async_session)
) -> List[Atm]:
    atms = await get_atms_by_params(db, **atm.model_dump())
    ats = []
    for item in atms:
        ats.append(Atm.model_validate(item, from_attributes=True))
    return ats


async def get_atms_(db: AsyncSession, ids: List[int]):
    atms = await get_atms_by_ids(db, ids)
    Atms = []
    for atm in atms:
        Atms.append(Atm.model_validate(atm, from_attributes=True))
    return Atms


async def get_offices(db: AsyncSession, ids: List[int]):
    deps = await get_departments_by_ids(db, ids)
    Deps = []
    for dep in deps:
        dep.openHours = json.dumps(dep.openHours)
        dep.openHoursIndividual = json.dumps(dep.openHoursIndividual)
        Deps.append(Office.model_validate(dep, from_attributes=True))
    return Deps


async def get_offices_by(
        office: BaseOffice = Depends(),
        query: str = Depends(query_to_str),
        db: AsyncSession = Depends(get_async_session)
) -> List[Office]:
    print(office.model_dump())
    ofs = await get_departments_by_params(db, **office.model_dump())
    offices = []
    for of in ofs:
        of.openHours = json.dumps(of.openHours)
        of.openHoursIndividual = json.dumps(of.openHoursIndividual)
        offices.append(Office.model_validate(of, from_attributes=True))
    return offices


async def login_user(uid: Annotated[Union[str, None], Cookie()] = None):

    if uid is None:
        return await create_user(redis)

    user = await get_user(redis, uid)

    if user is not None:
        return user

    return await create_user(redis)





