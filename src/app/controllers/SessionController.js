import jwt from 'jsonwebtoken';

import authConfig from '../config/auth';
import connection from '../../database/connection';

class SessionController {
  async store(request, response) {
    const { email, password } = request.body;

    const user = await connection('users')
        .where('email', email).first();

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