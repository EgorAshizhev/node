# REST API: Express.js + MongoDB

Сервер доступен по адресу `http://127.0.0.1:3005`.

## Установка и запуск

Нужен запущенный MongoDB (по умолчанию `mongodb://127.0.0.1:27017/library`).
Другой адрес можно задать переменной окружения `MONGO_URL`.

```bash
npm install
npm start        # обычный запуск
npm run dev      # запуск через nodemon
```

## Эндпоинты

| Метод | Путь | Описание |
|---|---|---|
| GET | `/users` | список всех пользователей |
| GET | `/users/:id` | пользователь по id |
| POST | `/users` | создать пользователя |
| PUT / PATCH | `/users/:id` | изменить пользователя |
| DELETE | `/users/:id` | удалить пользователя |
| GET | `/books` | список всех книг |
| GET | `/books/:id` | книга по id |
| POST | `/books` | создать книгу |
| PUT / PATCH | `/books/:id` | изменить книгу |
| DELETE | `/books/:id` | удалить книгу |

## Форматы данных

Пользователь: `firstName` (строка, от 2 символов), `lastName` (строка, от 2 символов), `username` (строка, от 5 символов).

Книга: `title` (строка, от 2 символов), `author` (строка, от 2 символов), `year` (число).

## Коды ответов

* `200` / `201` — успех, в теле JSON сущности
* `400` — данные не прошли валидацию или некорректный JSON
* `404` — сущность не найдена (в т.ч. неверный id) или несуществующий роут
* `500` — внутренняя ошибка сервера

## Примеры

```bash
curl -X POST http://127.0.0.1:3005/users -H 'Content-Type: application/json' \
  -d '{"firstName":"Ivan","lastName":"Ivanov","username":"ivan01"}'
curl http://127.0.0.1:3005/users
curl -X PATCH http://127.0.0.1:3005/users/<id> -H 'Content-Type: application/json' -d '{"lastName":"Petrov"}'
curl -X DELETE http://127.0.0.1:3005/users/<id>
```

## Структура

```
server.js            # запуск, подключение к MongoDB
models/User.js       # схема пользователя
models/Book.js       # схема книги
routes/crud.js       # общий CRUD-роутер
routes/users.js      # /users
routes/books.js      # /books
middleware/errors.js # 404 и обработка ошибок
```
