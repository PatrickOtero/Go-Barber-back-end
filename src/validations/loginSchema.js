const yup = require('./configurations')

const loginSchema = yup.object().shape({
  user_email: yup.string().email("Insira um e-mail em formato válido").required("O campo 'e-mail' é obrigatório"),
  user_password: yup
    .string()
    .required("O campo 'senha' é obrigatório")
    .min(5, 'Insira pelo menos 5 caracteres'),
})

module.exports = { loginSchema }
