import * as Yup from 'yup';

export default async (request, response, next) => {
    const { id } = request.body;

    const schema = Yup.object().shape({
        id: Yup.string().required(),
      });
  
      if(!(await schema.isValid(request.body))) {
        return response.status(400).json({ error: 'Validation fails' });
      }

    return next();
}