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

  async delete(request, response) {
    const { id } = request.params;
    const user_id = request.userId;

    const car = await connection('cars')
      .where('id', id)
      .select('user_id', user_id)
      .first();

    if(car.user_id != user_id) {
        return response.status(401).json({ error: 'Operation not permitted'});
    }

    await connection('incidents').where('id', id).delete();

    return response.status(204).json({ message: 'Vehicle successfully removed'});

  }
}

export default new CarController();