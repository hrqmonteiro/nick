import * as Yup from 'yup'

export const LoginValidator = Yup.object({
    email: Yup.string().email('E-mail inválido').max(50, 'E-mail muito longo').required('Você não informou o e-mail'),
    password: Yup.string().min(5, 'Senha muito curta').max(30, 'Senha muito longa').required('Você não informou a senha')
});
