import connection from '../../database/connection';

class ListMyCarsController {
  async index(request, response) {
    const id  = request.userId;

    const cars = await connection('cars').where('user_id', id).select('*');
    
    return response.json({
      cars
    });

  }
}

export default new ListMyCarsController();