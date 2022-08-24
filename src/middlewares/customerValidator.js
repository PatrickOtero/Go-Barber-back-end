const knex = require('../connection')
const jwt = require('jsonwebtoken')
const { customerPass } = require('../hashPass')

const customerValidation = async (req, res, next) => {
  let { authorization } = req.headers

  if (!authorization) return res.status(401).json({ message: 'Não autorizado' })

  try {
    const token = authorization.replace('Bearer ', '').trim()

    const { id } = jwt.verify(token, customerPass)

    const customerExists = await knex('customers').where({ id }).first()

    if (!customerExists)
      return res.status(404).json({ message: 'Usuário não encontrado' })

    const userProfile = customerExists

    const { customer_password: _, ...customer } = userProfile

    req.user = customer

    next()
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

module.exports = { customerValidation }
