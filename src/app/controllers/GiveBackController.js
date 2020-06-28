import connection from '../../database/connection';

class GiveBackController {
  async store(request, response) {
    const { board } = request.body;
    const user_reserved_id = request.userId;

    await connection('cars').where('board', board).where('user_reserved_id', user_reserved_id).update({
      user_reserved_id: null
    });

    return response.json({ message: 'Returned car' });

  }
}

export default new GiveBackController();