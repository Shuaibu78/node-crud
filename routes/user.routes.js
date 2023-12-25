const userController = require('../controllers/user.controller');
const routes = require('express').Router();

// CRUD routes /user for User model
routes.get('/', userController.getAllUsers);
routes.get('/:id', userController.getUserById);
routes.post('/', userController.createUser);
routes.put('/:id', userController.updateUser);
routes.delete('/:id', userController.deleteUser);

module.exports = routes;