import connection from '../../database/connection';


export default async (request, response, next) => {
    const id = request.userId;

    const rentCar =  await connection('cars').where('user_reserved_id', id).firts();
    
    if (!rentCar) {
        return response.status(401).json({ error: 'There are no cars rented' });
    }

    return next();

}
