import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import authConfig from '../config/auth';

export default async (request, response, next) => {
  const authMiddleware = request.headers.authorization;

  if(!authMiddleware) {
    return response.status(401).json({ error: 'Token not provided' });
  }

  const [, token] = authMiddleware.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);
    request.userId = decoded.id;
    
    return next();
  } catch (err) {
    return response.status(401).json({ error: 'Token invalid'});
  }

}