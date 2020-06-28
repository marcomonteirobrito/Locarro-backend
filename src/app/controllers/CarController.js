import { uuid } from 'uuidv4';

import connection from '../../database/connection';

class CarController {
  async index(request, response) {
    const cars = await connection('cars').select('*');

    response.json(cars);
  }

  async store(request, response) {
    const { board, model, year, color, value , observation } = request.body;
    const id = uuid();
    const user_id = request.userId;
      
    await connection('cars').insert({
      id,
      board,
      model,
      year,
      color,
      value,
      observation,
      user_id,
    });

    return response.json({ message: 'Car saved successfully' });
  }
}

export default new CarController();