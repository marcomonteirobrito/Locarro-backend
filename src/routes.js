import { Router } from 'express';
import multer from 'multer';
import multerConfig from './app/config/multer';
import multerGallery from './app/config/multerGallery';


import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import MobileSessionController from './app/controllers/MobileSessionController';
import CarController from './app/controllers/CarController';
import RentController from './app/controllers/RentController';
import GiveBackController from './app/controllers/GiveBackController';
import AvatarController from './app/controllers/AvatarController';
import CarGalleryController from './app/controllers/CarGalleryController';
import ListMyCarsController from './app/controllers/ListMyCarsController';

import UserMiddleware from './app/middlewares/UserMiddleware';
import SessionMiddleware from './app/middlewares/SesssionMiddleware';
import MobileMiddleware from './app/middlewares/MobileMiddleware';
import GiveBackMiddleware from './app/middlewares/GiveBackMiddleware';
import CarMiddleware from './app/middlewares/CarMiddleware';
import authMiddleware from './app/middlewares/auth';



const routes = new Router();
const upload = multer(multerConfig);
const gallery = multer(multerGallery);

routes.post('/users', UserMiddleware, UserController.store);
routes.post('/sessions', SessionMiddleware, SessionController.store);
routes.post('/mobileSessions', MobileMiddleware, MobileSessionController.store);
routes.get('/cars', CarController.index);
routes.get('/carGallery', CarGalleryController.index);
routes.get('/avatar/:user_id', AvatarController.index);
routes.get('/users/:id', UserController.index);
routes.get('/list/:id', ListMyCarsController.index);
routes.post('/cars/:user_id', CarMiddleware, CarController.store);
routes.use(authMiddleware);
routes.delete('/cars/:id', CarController.delete);
routes.post('/carGallery/:carId', gallery.single('carGallery'), CarGalleryController.store);
routes.post('/rent', RentController.store);
routes.get('/rent', RentController.index);
routes.post('/giveback', GiveBackMiddleware, GiveBackController.store);
routes.post('/avatar', upload.single('avatar'), AvatarController.store);


export default routes;