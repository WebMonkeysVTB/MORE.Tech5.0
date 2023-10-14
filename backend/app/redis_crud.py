import datetime
import uuid

from redis.asyncio import Redis


async def get_queue_position(redis: Redis, ticket: str):
    pass


async def add_to_office_queue(redis: Redis, ):
    pass


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