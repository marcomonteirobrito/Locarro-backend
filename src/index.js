import express from 'express';
import cors from 'cors';
import routes from './routes';
import path from 'path';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use('/avatar', express.static(path.resolve(__dirname, '..',  'tmp', 'uploads')));
app.use('/carGallery', express.static(path.resolve(__dirname, '..', 'tmp', 'uploads')));

app.listen(3333);