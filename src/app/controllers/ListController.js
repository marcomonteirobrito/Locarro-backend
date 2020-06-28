import connection from '../../database/connection';

class ListController {
  async index(request, response) {

    const cars = await connection('cars').select('*');
    
    return response.json({
      cars
    });

  }
}

export default new ListController();