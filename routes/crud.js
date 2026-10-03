const express = require('express');
const mongoose = require('mongoose');

// Невалидный id (не ObjectId) — это тоже "сущность не найдена".
function notFound(res, name) {
  return res.status(404).json({ error: `${name} not found` });
}

// Генерирует CRUD-роутер для переданной mongoose-модели.
function createCrudRouter(Model, entityName) {
  const router = express.Router();

  // Список всех
  router.get('/', async (req, res) => {
    const items = await Model.find();
    res.json(items);
  });

  // Создание
  router.post('/', async (req, res) => {
    const item = await Model.create(req.body);
    res.status(201).json(item);
  });

  // Получение по id
  router.get('/:id', async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) return notFound(res, entityName);
    const item = await Model.findById(req.params.id);
    if (!item) return notFound(res, entityName);
    res.json(item);
  });

  // Изменение по id (PUT и PATCH работают одинаково — обновляют переданные поля)
  const update = async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) return notFound(res, entityName);
    const item = await Model.findByIdAndUpdate(req.params.id, req.body, {
      returnDocument: 'after',
      runValidators: true,
    });
    if (!item) return notFound(res, entityName);
    res.json(item);
  };
  router.put('/:id', update);
  router.patch('/:id', update);

  // Удаление по id
  router.delete('/:id', async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) return notFound(res, entityName);
    const item = await Model.findByIdAndDelete(req.params.id);
    if (!item) return notFound(res, entityName);
    res.json(item);
  });

  return router;
}

module.exports = createCrudRouter;
