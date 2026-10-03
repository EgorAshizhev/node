const User = require('../models/User');
const createCrudRouter = require('./crud');

module.exports = createCrudRouter(User, 'User');
