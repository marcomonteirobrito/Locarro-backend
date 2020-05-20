import jwt from 'jsonwebtoken';
import * as Yup from 'yup';

import connection from '../../database/connection';
import authConfig from '../config/auth';

class SessionController {
  async store(request, response) {
    const { email, password } = request.body;

    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6),
    });

    if(!(await schema.isValid(request.body))) {
      return response.status(400).json({ error: 'Validation fails' });
    }

    const user = await connection('users')
      .where('email', email).first();

      if(!user) {
        return response.status(401).json({ error: 'User do not exists.'})
      }

    const checkPassword = await connection('users')
      .where('email', email)
      .where('password', password)
      .first();
    
      if(!checkPassword) {
       return response.status(401).json({ error: 'Passoword does not match'});
      }

    const { id, name } = user;
    const token = jwt.sign({ id }, authConfig.secret, {
      expiresIn: authConfig.expiresIn,
    });

    return response.json({
      user: {
        id,
        name,
        email,
      },
      token: token,
    });
  }
}

export default new SessionController();