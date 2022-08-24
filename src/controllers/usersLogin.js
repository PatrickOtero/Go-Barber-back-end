const knex = require('../connection')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { customerPass, barberPass } = require('../hashPass')
const { loginSchema } = require('../validations/loginSchema')

const userLogin = async (req, res) => {
  const { user_email, user_password } = req.body

  if (!user_email || !user_password)
    return res.status(400).json({ message: 'Ambos os campos são obrigatórios' })

  try {
    await loginSchema.validate(req.body)

    const customerEmailExist = await knex('customers')
      .where({
        customer_email: user_email,
      })
      .first()

    const barberEmailExist = await knex('barbers')
      .where({
        barber_email: user_email,
      })
      .first()

    if (!customerEmailExist && !barberEmailExist)
      return res
        .status(404)
        .json({ message: 'Combinação de email e senha incorreta' })

    if (customerEmailExist) {
      const customer = customerEmailExist

      const customerValidPassword = await bcrypt.compare(
        user_password,
        customerEmailExist.customer_password,
      )

      if (!customerValidPassword)
        return res
          .status(400)
          .json({ message: 'Combinação de email e senha incorreta' })

      const token = jwt.sign(
        { id: customer.id, userType: 'Customer' },
        customerPass,
        {
          expiresIn: '5h',
        },
      )

      const { customer_password: _, ...customerData } = customer

      return res.status(200).json({
        user_name: customerData.customer_name,
        user_email: customerData.customer_email,
        token,
        userType: 'customer',
      })
    }

    if (barberEmailExist) {
      const barber = barberEmailExist

      const barberValidPassword = await bcrypt.compare(
        user_password,
        barberEmailExist.barber_password,
      )

      if (!barberValidPassword)
        return res
          .status(400)
          .json({ message: 'Combinação de email e senha incorreta' })

      const token = jwt.sign(
        { id: barber.id, userType: 'Barber' },
        barberPass,
        {
          expiresIn: '5h',
        },
      )

      const { barber_password: _, ...barberData } = barber

      return res.status(200).json({
        user_name: barberData.barber_name,
        user_email: barberData.barber_email,
        token,
        userType: 'barber',
      })
    }
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

module.exports = { userLogin }
