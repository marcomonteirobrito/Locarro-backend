const { uuid } = require ('uuidv4');
const Yup = require ('yup');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');

const connection = require ('../../database/connection');

module.exports = {
  async index(request, response) {
    const cars = await connection('cars').select('*');

    response.json(cars);
  },

  async store(request, response) {
    const { board, model, year, color, value , observation } = request.body;
    const id = uuid();

    const tokenAuthorization = request.headers.authorization;
    const [, token] = tokenAuthorization.split(' ');

    const decoded = await promisify(jwt.verify)(token, '99fe3105936cebcf42aeebe73086e2bc');

    const user_id = decoded.id;

    if(!user_id) {
      return response.status(401).json({ error: 'Token invalid' });
    }
      
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
      response.status(400).json({ error: 'Board already exists '});
    }

    const car = await connection('cars').insert({
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
