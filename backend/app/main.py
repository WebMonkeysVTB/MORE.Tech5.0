from typing import Annotated, List

from fastapi import FastAPI, Depends

from sqlalchemy.ext.asyncio import AsyncSession
from starlette.responses import JSONResponse

from .dependencies import login_user, get_offices_by, get_atms_by
from database import get_async_session

from .sql_crud import get_departments
from schemas import Office, Atm

from starlette.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.delete('/api/delete/{ticket: str}')
async def pop(ticket: str):
    pass


@app.post('/api/queue/departments',
          summary='Записаться в электронную очередь для отделения'
          )
async def departments_queue():
    pass


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

