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

  async update(request, response) {
    const { id } = request.params;

    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      password: Yup.string().min(6).when('oldPassword', (oldPassword, field) => 
        oldPassword ? field.required() : field
      ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    if(!(await schema.isValid(request.body))) {
      return response.status(400).json({ error: 'Validation fails' });
    }

    const { email, name, password, oldPassword } = request.body;

    const user = await connection('users').where('id', id).first().select('*');

    if (oldPassword) {
      const checkPassword =  await connection('users').where('password', oldPassword).first();

      if (!checkPassword) {
        return response.status(401).json({ error: 'Password does not match' });
      }
    }

    await connection('users').where('id', id).first().update({
      name,
      email,
      password,
    })
      
    return response.json({ 
      name,
      email,
    });
  }
};

export default new UserController();