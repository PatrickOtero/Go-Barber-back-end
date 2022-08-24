const knex = require('../../connection')

const createCustomerInfoValidator = async (body) => {
  const { customer_email } = body

  const isRepeatedEmail = await knex('customers')
    .where({ customer_email })
    .first()

  if (isRepeatedEmail)
    return 'O e-mail inserido já está sendo usado por outro usuário'

  const isRepeatedEmailOnbarbers = await knex('barbers')
    .where({ barber_email: customer_email })
    .first()

  if (isRepeatedEmailOnbarbers)
    return 'O e-mail inserido já está sendo usado por outro usuário'
}

const editCustomerInfoValidator = async (body, customerId) => {
  const { user_email } = body

  const isRepeatedEmail = await knex('customers')
    .whereNot({ id: customerId })
    .where({ customer_email: user_email })
    .first()

  if (isRepeatedEmail)
    return 'O e-mail inserido já está sendo usado por outro usuário'

  const isRepeatedEmailOnBarbers = await knex('barbers')
    .where({ barber_email: user_email })
    .first()

  if (isRepeatedEmailOnBarbers)
    return 'O e-mail inserido já está sendo usado por outro usuário'
}

module.exports = { createCustomerInfoValidator, editCustomerInfoValidator }
