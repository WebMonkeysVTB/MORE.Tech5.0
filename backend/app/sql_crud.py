from typing import List

from models import Office as DbOffice, ATM as DbATM, City
# from schemas import Office as SchOffice
from sqlalchemy import select, Column
from sqlalchemy.ext.asyncio import AsyncSession


async def get_departments_by_ids(db: AsyncSession, ids: List[int]):
    query = select(DbOffice).where(DbOffice.id.in_(ids))
    return (await db.execute(query)).scalars().all()


async def get_atms_by_ids(db: AsyncSession, ids: List[int]):
    query = select(DbATM).where(DbATM.id.in_(ids))
    return (await db.execute(query)).scalars().all()


async def get_all_cities(db: AsyncSession):
    query = select(City.name)
    return (await db.execute(query)).scalars().all()


async def get_departments_by_params(db: AsyncSession, **kwargs):
    conditions = []
    print(kwargs)
    for k, v in kwargs.items():
        if v is not None:
            conditions.append(Column(k) == v)
    print(*conditions)
    query = select(DbOffice).where(*conditions)
    return (await db.execute(query)).scalars().all()


async def get_atms_by_params(db: AsyncSession, **kwargs):
    conditions = []
    for k, v in kwargs.items():
        if v is not None:
            conditions.append(Column(k) == v)
    query = select(DbATM).where(*conditions)
    return (await db.execute(query)).scalars().all()
