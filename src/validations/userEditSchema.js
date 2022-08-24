const yup = require('./configurations')

const editUserSchema = yup.object().shape({
  user_name: yup
    .string()
    .required("O campo 'nome' é obrigatório")
    .max(20, 'Nome muito grande'),
  user_email: yup
    .string()
    .email('Insira um e-mail com um formato válido')
    .required("O campo 'e-mail' é obrigatório"),
})

module.exports = { editUserSchema }
