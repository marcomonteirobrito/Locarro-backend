import connection from '../../database/connection';
import { uuid } from 'uuidv4';

class AvatarController {
  async index(request, response) {
    const { user_id } = request.params;
    const { id, name, path } = await connection('avatar').where('user_id', user_id).first().select('*');

    const url = `http://localhost:3333/avatar/${path}`;

    response.json({
      id,
      name,
      path,
      user_id,
      url
    }
    );
  }

  async store(request, response) {
    const { originalname: name, filename: path } = request.file;
    const user_id = request.userId;
    const id = uuid();

    await connection('avatar').insert({
      id,
      name,
      path,
      user_id,
    });

    return response.json({
      id,
      name,
      path,
      user_id,
    });
  }
}

export default new AvatarController();