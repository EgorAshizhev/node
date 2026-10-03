// Несуществующий роут -> 404
function notFoundHandler(req, res) {
  res.status(404).json({ error: 'Route not found' });
}

// Общий обработчик ошибок (Express 5 сам передаёт сюда ошибки из async-обработчиков)
function errorHandler(err, req, res, next) {
  if (res.headersSent) return next(err);

  // Ошибки валидации mongoose (например, слишком короткое имя) -> 400
  if (err.name === 'ValidationError') {
    const details = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({ error: 'Validation failed', details });
  }

  // Неверный тип значения (например, year: "abc") -> 400
  if (err.name === 'CastError') {
    return res.status(400).json({ error: `Invalid value for field "${err.path}"` });
  }

  // Некорректный JSON в теле запроса -> 400
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ error: 'Invalid JSON' });
  }

  // Всё остальное -> 500
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
}

module.exports = { notFoundHandler, errorHandler };
