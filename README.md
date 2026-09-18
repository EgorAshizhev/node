# Node.js HTTP сервер (http + fs)

## Установка

```bash
npm install
```

Это установит `nodemon` как dev-зависимость (см. `package.json`).

## Запуск

Через nodemon (автоперезапуск при изменении файлов):

```bash
npm run dev
```

Обычный запуск без nodemon:

```bash
npm start
```

Сервер поднимется на `http://127.0.0.1:3003`.

## Логика обработчика

| Запрос | Ответ | Код |
|---|---|---|
| `/` (без параметров) | `Hello, World!` | 200 |
| `/?hello=Ivan` | `Hello, Ivan.` | 200 |
| `/?hello=` или `/?hello` без значения | `Enter a name` | 400 |
| `/?users` | содержимое `data/users.json` | 200 |
| `/?foo=bar` (любой другой параметр) | пустой ответ | 500 |

## Проверка (примеры curl)

```bash
curl -i "http://127.0.0.1:3003/"
curl -i "http://127.0.0.1:3003/?hello=Ivan"
curl -i "http://127.0.0.1:3003/?hello="
curl -i "http://127.0.0.1:3003/?users"
curl -i "http://127.0.0.1:3003/?foo=bar"
```

## Структура проекта

```
node-http-server/
├── data/
│   └── users.json     # исходные данные, отдаются по ?users
├── server.js           # сам сервер (http + fs)
├── nodemon.json        # конфигурация nodemon
├── package.json
└── README.md
```
