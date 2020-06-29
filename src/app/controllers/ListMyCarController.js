import connection from '../../database/connection';

class ListMyCarController {
  async index(request, response) {
    const id  = request.userId;

    const cars = await connection('cars').where('user_id', id).first().select('*');
    
    return response.json({
      cars
    });

  }
}

export default new ListMyCarController();