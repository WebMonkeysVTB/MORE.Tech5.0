import datetime
import uuid
from base64 import urlsafe_b64encode as b64_enc, urlsafe_b64decode as b64_dec

from redis.asyncio import Redis


async def get_queue_count(redis: Redis, prefix: str, id: int):
    return await redis.scard(f'{prefix}{id}')


async def rm_from_queue(redis: Redis, prefix: str, id: int, ticket: str) -> str:
    ismember = await redis.sismember(f'{prefix}{id}', ticket)
    if ismember == 0:
        return False
    if ismember == 1:
        await redis.srem(f'{prefix}{id}', ticket)
        #todo something else
        return ticket


async def add_to_queue(redis: Redis, prefix: str, id: int, ticket: str) -> str:
    # todo something else
    await redis.sadd(f'{prefix}{id}', ticket)


async def update_user(redis: Redis, uid, data):
    await redis.set(f'user:{uid}', data)
    await redis.expire(f'user:{uid}', datetime.timedelta(days=7))
    return await get_user(redis, uid)


async def get_user(redis: Redis, uid):
    user = await redis.get(f'user:{uid}')
    if user is None:
        return None
    return {'uid': uid, 'data': user.decode('utf-8')}


async def delete_user(redis: Redis, uid):
    await redis.delete(f'user:{uid}')


async def create_user(redis: Redis):
    uid = uuid.uuid4().hex
    await redis.set(f'user:{uid}', datetime.datetime.utcnow().strftime("%m/%d/%Y, %H:%M:%S"))
    await redis.expire(f'user:{uid}', datetime.timedelta(days=7))
    return await get_user(redis, uid)