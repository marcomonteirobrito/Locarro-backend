const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const connection = require ('../../database/connection');

module.exports = {
  async index(request, response) {
    const tokenAuthorization = request.headers.authorization;
    const [, token] = tokenAuthorization.split(' ');

    const decoded = await promisify(jwt.verify)(token, '99fe3105936cebcf42aeebe73086e2bc');

    const user_reserved_id = decoded.id;

    const cars = await connection('cars').where('user_reserved_id', user_reserved_id).select('*');
    
    return response.json({
      cars
    });

  }
}