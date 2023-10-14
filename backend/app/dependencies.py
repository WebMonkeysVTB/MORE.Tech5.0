import json
from typing import Annotated, Union, Literal, List

from fastapi import Cookie, Depends, Body
from redis.asyncio import Redis
from sqlalchemy.ext.asyncio import AsyncSession
from starlette.requests import Request

from .redis_crud import create_user, get_user
from .sql_crud import get_departments, get_atms
from config import REDIS_HOST, REDIS_PORT
from schemas import Office, BaseOffice, BaseAtm, Atm

from database import get_async_session


redis = Redis(host=REDIS_HOST, port=REDIS_PORT)


async def query_to_str(request: Request):
    return request.query_params


async def add_to_department_queue(
        departmentId: Annotated[int, Body(embed=True)],
        operation: Annotated[str, Body(embed=True)],
        exp_time: Annotated[int, Body(embed=True)],
):

    pass


async def get_atms_by(
        atm: BaseAtm = Depends(),
        query: str = Depends(query_to_str),
        db: AsyncSession = Depends(get_async_session)
) -> List[Atm]:
    atms = await get_atms(db, **atm.model_dump())
    ats = []
    for item in atms:
        ats.append(Atm.model_validate(item, from_attributes=True))
    return ats


async def get_offices_by(
        office: BaseOffice = Depends(),
        query: str = Depends(query_to_str),
        db: AsyncSession = Depends(get_async_session)
) -> List[Office]:
    print(office.model_dump())
    ofs = await get_departments(db, **office.model_dump())
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





