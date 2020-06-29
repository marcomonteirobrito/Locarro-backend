import * as Yup from 'yup';

import connection from '../../database/connection';

export default async (request, response, next) => {
    const { board, model, year, color, value , observation } = request.body;

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

    return next();
}