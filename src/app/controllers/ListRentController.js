import connection from '../../database/connection';
import verifyId from '../middlewares/verifyId';

class ListRentController {
  async index(request, response) {
    const token = request.headers.authorization;
    const user_reserved_id = await verifyId(token);

    const cars = await connection('cars').where('user_reserved_id', user_reserved_id).select('*');
    
    return response.json({
      cars
    });

  }
}

export default new ListRentController();