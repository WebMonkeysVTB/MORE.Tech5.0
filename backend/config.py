from dotenv import load_dotenv
import os

load_dotenv(dotenv_path='.env-prod')
DB_HOST = os.environ.get("DB_HOST")
DB_PORT = os.environ.get("DB_PORT")
DB_NAME = os.environ.get("DB_NAME")
DB_USER = os.environ.get("DB_USER")
DB_PASS = os.environ.get("DB_PASS")

REDIS_HOST = os.environ.get("REDIS_HOST")
REDIS_PORT = os.environ.get("REDIS_PORT")

ANALYTICS_HOST = os.environ.get("ANALYTICS_HOST")
ANALYTICS_PORT = os.environ.get("ANALYTICS_PORT")

ANALYTICS_URL = f'http://{ANALYTICS_HOST}:{ANALYTICS_PORT}/get_most_optimal_departments'

DB_ASYNC_ENGINE = f'postgresql+asyncpg://{DB_USER}:{DB_PASS}@{DB_HOST}:{DB_PORT}/{DB_NAME}'
DB_SYNC_ENGINE = f'postgresql+psycopg2://{DB_USER}:{DB_PASS}@{DB_HOST}:{DB_PORT}/{DB_NAME}'
DB_URL = f'postgresql://{DB_USER}:{DB_PASS}@{DB_HOST}:{DB_PORT}/{DB_NAME}'
VTB_URL = os.environ.get("VTB_URL")
