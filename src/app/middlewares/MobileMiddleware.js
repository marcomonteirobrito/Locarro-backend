import * as Yup from 'yup';
import connection from '../../database/connection';

export default async (request, response, next) => {
    const { email, password } = request.body;

    const schema = Yup.object().shape({
        email: Yup.string().email().required(),
        password: Yup.string().required().min(6),
      });
  
      if(!(await schema.isValid(request.body))) {
        return response.status(400).json({ error: 'Validation fails' });
      }
  
    const user = await connection('users')
        .where('email', email).first();
  
        if(!user) {
          return response.status(401).json({ error: 'User do not exists.'})
        }
  
    const checkPassword = await connection('users')
        .where('email', email)
        .where('password', password)
        .first();
      
        if(!checkPassword) {
         return response.status(401).json({ error: 'Passoword does not match'});
        }
    
    const provider = await connection('users')
        .where('email', email)
        .where('password', password)
        .where('provider', false)
        .first();

        if(!provider) {
            return response.status(401).json({ error: 'Providers not allowed in the mobile version'});
        }

      return next();
}