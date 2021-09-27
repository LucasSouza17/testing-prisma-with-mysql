import express from 'express';
import UsersController from './controllers/UsersController'

const routes = express.Router();

routes.post('/users', UsersController.create);
routes.get('/users', UsersController.index);
routes.get('/users/:id', UsersController.find);
routes.put('/users/:id', UsersController.update);


export default routes;