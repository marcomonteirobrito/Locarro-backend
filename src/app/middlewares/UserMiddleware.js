import * as Yup from 'yup';
import connection from '../../database/connection';

export default async (request, response, next) => {
    const { name, email, password, address, city, uf, phoneNumber, provider } = request.body;

    const schema = Yup.object().shape({
        name: Yup.string().required(),
        email: Yup.string().email().required(),
        password: Yup.string().required().min(6),
        address: Yup.string().required(),
        city: Yup.string().required(),
        uf: Yup.string().required().max(2),
        phoneNumber: Yup.string().required(),
        provider: Yup.string().required(),
      });
    
      if(!(await schema.isValid(request.body))) {
        return response.status(400).json({ error: 'Validation fails' });
      }
    
      const emailExists = await connection('users').where('email', email).first();
    
      if(emailExists) {
        return response.status(400).json({ error: 'Email already used.'});
      }

      return next();
}
