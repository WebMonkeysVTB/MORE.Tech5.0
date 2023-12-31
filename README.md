# VTB MAPS

## Инструкция по запуску

### Backend
Для выполнения следующих команд необходимо установить Docker

- Перейти в директорию /backend

В терминале прописать следующие команды:
```sh
docker compose build 
docker compose up 
```

После выполнения этих команд будет выполнено:

- Поднимется база данных PostgreSql и будут выполнены миграции
- Поднимется in-memory база данных Redis
- Поднимется CRUD сервер
- Поднимется микросервис для аналитики

### Frontend
Для выполнения следующих команд необходимо иметь Node.js

- Перейти в директорию /frontend

В терминале прописать следующие команды:

```shell
npm install
npm start
```

Первая установит необходимые зависимости.

Вторая запустит сервер на localhost:3000

### Использование

Далее необходимо перейти на http://localhost:3000/

Приложение готово к работе!

## Документация

После запуска сервера документация swagger доступна по url

- http://localhost:1234/docs