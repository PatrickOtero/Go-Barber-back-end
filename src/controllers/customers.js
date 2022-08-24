const {
  createCustomerSchema,
} = require('../validations/customers/customerSchemas')
const knex = require('../connection')
const bcrypt = require('bcrypt')
const {
  createCustomerInfoValidator,
  editCustomerInfoValidator,
} = require('../helpers/customers/customerHelpers')
const { editUserSchema } = require('../validations/userEditSchema')

const customerRegister = async (req, res) => {
  const { customer_name, customer_email, customer_password } = req.body
  try {
    await createCustomerSchema.validate(req.body)

    const errorMessage = await createCustomerInfoValidator(req.body)

    if (errorMessage) return res.status(401).json({ errorMessage })

    const encryptedPassword = await bcrypt.hash(customer_password, 10)

    const customerCreated = await knex('customers').insert({
      customer_name,
      customer_email,
      customer_password: encryptedPassword,
    })

    if (customerCreated.length)
      return res
        .status(500)
        .json({ message: 'Não foi possível se conectar com o banco de dados.' })

    return res.status(200).json({ message: 'Usuário criado com sucesso.' })
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

const customerEdit = async (req, res) => {
  const {
    user_name,
    user_email,
    user_password,
    user_current_password,
  } = req.body

  const { id } = req.user

  try {
    await editUserSchema.validate(req.body)

    const errorMessage = await editCustomerInfoValidator(req.body, id)

    if (errorMessage) return res.status(401).json({ errorMessage })

    if (user_password.length) {
      if (!user_current_password)
        return res
          .status(401)
          .json({ message: 'É obrigatório informar a senha atual' })

      if (user_password.length < 5)
        return res
          .status(401)
          .json({ message: 'Senha muito curta. Insira ao menos 5 caracteres.' })

      const currentPassword = await knex('customers')
        .where({ id })
        .select('customer_password')
        .first()

      const userValidPassword = await bcrypt.compare(
        user_current_password,
        currentPassword.customer_password,
      )

      if (!userValidPassword)
        return res.status(401).json({ message: 'A senha atual está incorreta' })

      const encryptedPassword = await bcrypt.hash(user_password, 10)

      const userEditedWithPassword = await knex('customers')
        .update({
          customer_name: user_name,
          customer_email: user_email,

          customer_password: encryptedPassword,
        })
        .where({ id })

      if (userEditedWithPassword.length)
        return res.status(500).json({
          message: 'Não foi possível conectar-se com o banco de dados.',
        })

      return res.status(200).json({ message: 'Usuário editado com sucesso.' })
    }

    const userEdited = await knex('customers')
      .update({
        customer_name: user_name,
        customer_email: user_email,
      })
      .where({ id })

    if (userEdited.length)
      return res.status(500).json({
        message: 'Não foi possível conectar-se com o banco de dados.',
      })

    return res.status(200).json({ message: 'Usuário editado com sucesso.' })
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

module.exports = { customerRegister, customerEdit }
