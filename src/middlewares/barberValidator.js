const knex = require('../connection')
const jwt = require('jsonwebtoken')
const { barberPass } = require('../hashPass')

const barberValidation = async (req, res, next) => {
  let { authorization } = req.headers

  if (!authorization) return res.status(401).json({ message: 'Não autorizado' })

  try {
    const token = authorization.replace('Bearer ', '').trim()

    const { id } = jwt.verify(token, barberPass)

    const barberExists = await knex('barbers').where({ id }).first()

    if (!barberExists)
      return res.status(404).json({ message: 'Usuário não encontrado' })

    const userProfile = barberExists

    const { barber_password: _, ...barber } = userProfile

    req.user = barber

    next()
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

module.exports = { barberValidation }
