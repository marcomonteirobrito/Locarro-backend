import connection from '../../database/connection';

class ListRentController {
  async index(request, response) {
    const user_reserved_id = request.userId;

    const cars = await connection('cars').where('user_reserved_id', user_reserved_id).select('*');

    if(!cars) {
      return response.status(401).json({ error: 'there are no cars registered' });
    }
    
    return response.json({
      cars
    });

  }
}

export default new ListRentController();