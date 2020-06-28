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
import ListRentController from './app/controllers/ListRentController';
import authMiddleware from './app/middlewares/auth';
import AvatarController from './app/controllers/AvatarController';
import CarGalleryController from './app/controllers/CarGalleryController';
import ListController from './app/controllers/ListController';

import UserMiddleware from './app/middlewares/UserMiddleware';
import SessionMiddleware from './app/middlewares/SesssionMiddleware';
import MobileMiddleware from './app/middlewares/MobileMiddleware';
import RentMiddleware from './app/middlewares/RentMiddleware';
import ListRentMiddleware from './app/middlewares/ListRentMiddleware';
import GiveBackMiddleware from './app/middlewares/GiveBackMiddleware';
import CarMiddleware from './app/middlewares/CarMiddleware';



const routes = new Router();
const upload = multer(multerConfig);
const gallery = multer(multerGallery);

routes.post('/users', UserMiddleware, UserController.store);
routes.get('/users', UserController.index);
routes.post('/sessions', SessionMiddleware, SessionController.store);
routes.post('/mobileSessions'), MobileMiddleware, MobileSessionController.store;
routes.get('/cars', CarController.index);
routes.get('/list'), ListController.index;
routes.use(authMiddleware);
routes.post('/cars', CarMiddleware, CarController.store);
routes.post('/rent', RentMiddleware, RentController.store);
routes.get('/rent', ListRentMiddleware, ListRentController.index);
routes.post('/giveback', GiveBackMiddleware, GiveBackController.store);
routes.post('/avatar', upload.single('avatar'), AvatarController.store);
routes.get('/avatar', AvatarController.index);
routes.get('/carGallery', CarGalleryController.index);
routes.post('/carGallery/:carId', gallery.array('carGallery'), CarGalleryController.store);


export default routes;