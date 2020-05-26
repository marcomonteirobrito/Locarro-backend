import * as Yup from 'yup';
import connection from '../../database/connection';

class RentController {
  async store(request, response) {
    const { id } = request.body;
    const user_reserved_id = request.userId;

    const schema = Yup.object().shape({
      id: Yup.string().required(),
    });

    if(!(await schema.isValid(request.body))) {
      return response.status(400).json({ error: 'Validation fails' });
    }

    await connection('cars').where('id', id).update({
      user_reserved_id: user_reserved_id
    });

    return response.status(200).json({ message: 'Car successfully rented' });
  }
}

export default new RentController();