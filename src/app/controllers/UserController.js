import { uuid } from 'uuidv4';
import * as Yup from 'yup';

import connection from '../../database/connection';

class UserController {
  async index(request, response) {
    const { id } = request.params;
    const user = await connection('users').where('id', id).first().select('*');

    return response.json(user);
  }

  async store(request, response) {
    const { name, email, password, address, city, uf, phoneNumber, provider } = request.body;
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
      provider
    });

    return response.status(200).json({ message: 'Successfully created'});
  }
};

export default new UserController();