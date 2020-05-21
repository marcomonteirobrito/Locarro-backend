import * as Yup from 'yup';
import connection from '../../database/connection';
import verifyId from '../middlewares/verifyId';

class GiveBackController {
  async store(request, response) {
    const { board } = request.body;
    const user_reserved_id = request.userId;

    const schema = Yup.object().shape({
      board: Yup.string().required(),
    });

    if(!(await schema.isValid(request.body))) {
      return response.status(400).json({ error: 'Validation fails' });
    }

    const car = await connection('cars').where('board', board).where('user_reserved_id', user_reserved_id).update({
      user_reserved_id: null
    });

    return response.json({ message: 'Returned car' });
  }
}

export default new GiveBackController();