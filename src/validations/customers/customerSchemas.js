const yup = require('../configurations')

const createCustomerSchema = yup.object().shape({
  customer_name: yup
    .string()
    .required("O campo 'nome' é obrigatório")
    .max(20, 'Nome muito grande'),
  customer_email: yup
    .string()
    .email()
    .required("O campo 'e-mail' é obrigatório"),
  customer_password: yup
    .string()
    .required("O campo 'senha' é obrigatório")
    .min(5, 'Insira pelo menos 5 caracteres'),
})

module.exports = { createCustomerSchema }
