import * as Yup from 'yup';
import connection from '../../database/connection';
import verifyId from '../middlewares/verifyId';

class RentController {
  async store(request, response) {
    const { id } = request.body;
    const token = request.headers.authorization;
    const user_reserved_id = await verifyId(token);

    const schema = Yup.object().shape({
      id: Yup.string().required(),
    });

    if(!(await schema.isValid(request.body))) {
      return response.status(400).json({ error: 'Validation fails' });
    }

    await connection('cars').where('id', id).update({
      user_reserved_id: user_reserved_id
    });

    return response.json({ message: 'Car successfully rented' });
  }
}

export default new RentController();