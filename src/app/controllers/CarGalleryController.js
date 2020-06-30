import connection from '../../database/connection';
import { uuid } from 'uuidv4';

class CarGalleryController {
  async index(request, response) {
    const { car_id } = request.params;
    const { id, name, path } = await connection('carGallery').where('car_id', car_id).first().select('*');

    const url = `http://localhost:3333/carGallery/${path}`;

    response.json({
      id,
      name,
      path,
      car_id,
      url
    }
    );
  }

  async store(request, response) {
    const { originalname: name, filename: path } = request.file;
    const car_id = request.params.carId;
    const id = uuid();

    await connection('carGallery').insert({
      id,
      name,
      path,
      car_id,
    });

    return response.json({
      id,
      name,
      path,
      car_id,
    });
  }
}

export default new CarGalleryController();