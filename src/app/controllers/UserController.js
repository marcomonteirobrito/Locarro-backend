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

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6),
      address: Yup.string().required(),
      city: Yup.string().required(),
      uf: Yup.string().required().max(2),
      phoneNumber: Yup.string().required(),
    });

    if(!(await schema.isValid(request.body))) {
      return response.status(400).json({ error: 'Validation fails' });
    }

    const emailExists = await connection('users').where('email', email).first();

    if(emailExists) {
      return response.status(400).json({ error: 'Email already used.'});
    }

    await connection('users').insert({
      id,
      name,
      email,
      password,
      address,
      city,
      uf,
      phoneNumber,
      latitude,
      longitude,
    });

    return response.status(200).json({ message: 'Successfully created'});
  }
};

export default new UserController();