import { uuid } from 'uuidv4';
import * as Yup from 'yup';

import connection from '../../database/connection';

class UserController {
  async index(request, response) {
    const users = await connection('users').select('*');

    return response.json(users);
  }

  async store(request, response) {
    const { name, email, password, address, city, uf, phoneNumber, latitude, longitude } = request.body;
    const id = uuid();

    await connection('users').insert({
      id,
      name,
      email,
      password,
      address,
      city,
      uf,
      phoneNumber,
    });

    return response.status(200).json({ message: 'Successfully created'});
  }
};

export default new UserController();