from typing import Annotated, List

from fastapi import FastAPI, Depends

from sqlalchemy.ext.asyncio import AsyncSession
from starlette.middleware.cors import CORSMiddleware
from starlette.responses import JSONResponse

from .dependencies import login_user, get_offices_by, get_atms_by, get_cities, \
    add_to_dep_queue, add_to_atm_queue, del_from_dep_queue, del_from_atm_queue, \
    get_optional_deps, get_optional_atms, get_offices, get_atms_
from database import get_async_session

from schemas import Office, Atm, BaseOffice, BaseAtm

app = FastAPI()

# origins = [
#     "http://localhost.tiangolo.com",
#     "https://localhost.tiangolo.com",
#     "http://localhost",
#     "http://localhost:8080",
# ]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# @app.get('/statistic_dep')
# async def dfd(id, current_time: str) -> :
#
#
# @app.post('/workload_dep')
# async def dsf(id, count)
# @app.post('/queueload_dep')
# async def dsf(id, count)
# @app.post('/workload_atm')
# async def dsf(id, count)
# @app.post('/queueload_atm')
# async def dsf(id, count)


@app.post('/api/workload/atms',
         summary='Выбрать оптимальные по времени банкоматы')
async def get_atm_time(atms=Depends(get_optional_atms),
                       db: AsyncSession = Depends(get_async_session)):
    ids = []
    for atm in atms:
        ids.append(atm['id'])
    full_atms = await get_atms_(db, ids)
    result = []
    for atm in full_atms:
        for at in atms:
            if at['id'] == atm.id:
                res = atm.model_dump()
                res.update(at)
                result.append(res)
                break
    return result


@app.post('/api/workload/departments',
         summary='Выбрать оптимальные по времени отделения')
async def get_dep_time(deps=Depends(get_optional_deps),
                       db: AsyncSession = Depends(get_async_session)):
    ids = []
    for dep in deps:
        ids.append(dep['id'])
    full_deps = await get_offices(db, ids)
    result = []
    for dep in full_deps:
        for dp in deps:
            if dp['id'] == dep.id:
                res = dep.model_dump()
                res.update(dp)
                result.append(res)
                break
    return result


@app.delete('/api/queue/atms{ticket}',
            summary='Удалить из электронной очереди для банкомата')
async def del_atm_queue(ticket: str = Depends(del_from_atm_queue)):
    if ticket:
        return ticket
    return JSONResponse({'error': 'Invalid ticket'}, status_code=400)


@app.post('/api/queue/atms',
          summary='Записаться в электронную очередь для банкомата'
          )
async def atms_queue(ticket: str = Depends(add_to_atm_queue)):
    return ticket


@app.delete('/api/queue/departments{ticket}',
            summary='Удалить из электронной очереди для отделения'
            )
async def del_dep_queue(ticket: str = Depends(del_from_dep_queue)):
    if ticket:
        return ticket
    return JSONResponse({'error': 'Invalid ticket'}, status_code=400)


@app.post('/api/queue/departments',
          summary='Записаться в электронную очередь для отделения'
          )
async def departments_queue(ticket: str = Depends(add_to_dep_queue)):
    return ticket


@app.get('/api/cities', summary='Получить список доступных городов')
async def get_cities(cities=Depends(get_cities)) -> List[str]:
    return cities


@app.get('/api/atms',
         summary='Список банкоматов'
         )
async def get_atms(atms=Depends(get_atms_by)) -> List[Atm]:
    return atms


@app.get('/api/departments',
         summary='Список отделений'
         )
async def get_departments(offices=Depends(get_offices_by)) -> List[Office]:
    return offices

