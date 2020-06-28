import connection from '../../database/connection';

class ListRentController {
  async index(request, response) {
    const id = request.userId;

    const cars = await connection('cars').where('user_reserved_id', id).select('*');
    
    return response.json({
      cars
    });

  }
}

export default new ListRentController();