import { Router } from 'express';
import multer from 'multer';
import multerConfig from './app/config/multer';


import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import CarController from './app/controllers/CarController';
import RentController from './app/controllers/RentController';
import GiveBackController from './app/controllers/GiveBackController';
import ListRentController from './app/controllers/ListRentController';
import authMiddleware from './app/middlewares/auth';
import AvatarController from './app/controllers/AvatarController';


const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.get('/users', UserController.index);
routes.post('/sessions', SessionController.store);
routes.get('/cars', CarController.index);
routes.use(authMiddleware);
routes.post('/cars', CarController.store);
routes.post('/rent', RentController.store);
routes.get('/rent', ListRentController.index);
routes.post('/giveback', GiveBackController.store);
routes.post('/avatar', upload.single('avatar'), AvatarController.store);
routes.get('/avatar', AvatarController.index);


export default routes;