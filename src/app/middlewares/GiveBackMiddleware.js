import * as Yup from 'yup';

export default async (request, response, next) => {
    const { board } = request.body;

    const schema = Yup.object().shape({
    board: Yup.string().required(),
    });

    if(!(await schema.isValid(request.body))) {
    return response.status(400).json({ error: 'Informe a placa' });
    }

    return next();

}