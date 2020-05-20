import connection from '../../database/connection';
import verifyId from '../middlewares/verifyId';
import { uuid } from 'uuidv4';

class AvatarController {
  async store(request, response) {
    const { originalname: name, filename: path } = request.file;
    const token = request.headers.authorization;
    const user_id = await verifyId(token);
    const id = uuid();

    const avatar = await connection('avatar').insert({
      id,
      name,
      path,
      user_id
    });

    return response.json({
      id,
      name,
      path,
      user_id
    });
  }
}

export default new AvatarController();