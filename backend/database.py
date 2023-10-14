from sqlalchemy import create_engine
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker, Session


from config import DB_ASYNC_ENGINE, DB_SYNC_ENGINE


async_engine = create_async_engine(DB_ASYNC_ENGINE)
sync_engine = create_engine(DB_SYNC_ENGINE)
async_session = sessionmaker(async_engine,
                             class_=AsyncSession,
                             expire_on_commit=False
                             )

sync_session = sessionmaker(sync_engine,
                            expire_on_commit=False
                            )


async def get_async_session() -> AsyncSession:
    async with async_session() as session:
        yield session
