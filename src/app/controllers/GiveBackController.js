const Yup = require ('yup');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const connection = require ('../../database/connection');

module.exports = {
  async store(request, response) {
    const { board } = request.body;
    const tokenAuthorization = request.headers.authorization;
    const [, token] = tokenAuthorization.split(' ');

    const decoded = await promisify(jwt.verify)(token, '99fe3105936cebcf42aeebe73086e2bc');

    const user_reserved_id = decoded.id;

    const schema = Yup.object().shape({
      board: Yup.string().required(),
    });

    if(!(await schema.isValid(request.body))) {
      return response.status(400).json({ error: 'Validation fails' });
    }

    const car = await connection('cars').where('board', board).where('user_reserved_id', user_reserved_id).update({
      user_reserved_id: null
    });

    return response.json({ message: 'Returned car' });
  }
}