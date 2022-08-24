const yup = require('../configurations')

const createBarberSchema = yup.object().shape({
  barber_name: yup
    .string()
    .required("O campo 'nome' é obrigatório")
    .max(20, 'Nome muito grande'),
  barber_email: yup.string().email().required("O campo 'e-mail' é obrigatório"),
  barber_password: yup
    .string()
    .required("O campo 'senha' é obrigatório")
    .min(5, 'Insira pelo menos 5 caracteres'),
})

module.exports = { createBarberSchema }
