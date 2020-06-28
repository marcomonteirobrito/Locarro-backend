import jwt from 'jsonwebtoken';

import authConfig from '../config/auth';

class MobileSessionController {
  async store(request, response) {
    const { email, password } = request.body;

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

export default new MobileSessionController();