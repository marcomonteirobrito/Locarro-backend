import connection from '../../database/connection';
import verifyId from '../middlewares/verifyId';

class ListRentController {
  async index(request, response) {
    const user_reserved_id = request.userId;

    const cars = await connection('cars').where('user_reserved_id', user_reserved_id).select('*');
    
    return response.json({
      cars
    });

  }
}

export default new ListRentController();