import connection from '../../database/connection';

class RentController {
  async index(request, response) {
    const id = request.userId;

    const rentCar = await connection('cars').where('user_reserved_id', id).select('*');

    return response.json(rentCar);
    
  }

  async store(request, response) {
    const { id } = request.body;
    const user_reserved_id = request.userId;

    await connection('cars').where('id', id).update({
      user_reserved_id: user_reserved_id
    });

    return response.status(200).json({ message: 'Car successfully rented' });
  }
}

export default new RentController();