import { promisify } from 'util';
import jwt from 'jsonwebtoken';

export default async function verifyId(token) {
  const [, tokenId] = token.split(' ');
  const decoded = await promisify(jwt.verify)(tokenId, '99fe3105936cebcf42aeebe73086e2bc');
  const user_id = decoded.id;
  
  return user_id;

}