const knex = require('../../connection')

const createBarberInfoValidator = async (body) => {
  const { barber_email } = body

  const isRepeatedEmail = await knex('barbers')
    .where({ barber_email })
    .first()

  if (isRepeatedEmail)
    return 'O e-mail inserido já está sendo usado por outro usuário'

  const isRepeatedEmailOnCustomers = await knex('customers')
    .where({ customer_email: barber_email })
    .first()

  if (isRepeatedEmailOnCustomers)
    return 'O e-mail inserido já está sendo usado por outro usuário'
}

const editBarberInfoValidator = async (body, barberId) => {
  const { user_email } = body

  const isRepeatedEmail = await knex('barbers')
    .whereNot({ id: barberId })
    .where({ barber_email: user_email })
    .first()

  if (isRepeatedEmail)
    return 'O e-mail inserido já está sendo usado por outro usuário'

  const isRepeatedEmailOnCustomers = await knex('customers')
    .where({ customer_email: user_email })
    .first()

  if (isRepeatedEmailOnCustomers)
    return 'O e-mail inserido já está sendo usado por outro usuário'
}

module.exports = {
  createBarberInfoValidator,
  editBarberInfoValidator,
}
