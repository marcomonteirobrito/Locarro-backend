import { uuid } from 'uuidv4';
import * as Yup from 'yup';

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
      
    const schema = Yup.object().shape({
      board: Yup.string().required(),
      model: Yup.string().required(),
      year: Yup.string().required(),
      color: Yup.string().required(),
      value: Yup.string().required(),
      observation: Yup.string().required(),
    });

    if(!(await schema.isValid(request.body))) {
      return response.status(400).json({ error: 'Validation fails' });
    }

    const carExists = await connection('cars').where('board', board).first();

    if(carExists) {
      response.status(400).json({ error: 'Board already exists'});
    }

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