const { createBarberSchema } = require('../validations/barbers/barberSchemas')
const knex = require('../connection')
const bcrypt = require('bcrypt')
const {
  createBarberInfoValidator,
  editBarberInfoValidator,
} = require('../helpers/barbers/barbersHelpers')
const { editUserSchema } = require('../validations/userEditSchema')
const { errorMonitor } = require('nodemailer/lib/xoauth2')

const listBarbers = async (req, res) => {
  try {
    const barbersList = await knex('barbers')

    if (!barbersList.length)
      return res.status({ message: 'Não há barbeiros cadastrados.' })

    return res.status(200).json(barbersList)
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

const barberRegister = async (req, res) => {
  const { barber_name, barber_email, barber_password } = req.body
  try {
    await createBarberSchema.validate(req.body)

    const message = await createBarberInfoValidator(req.body)

    if (message) return res.status(401).json({ message })

    const encryptedPassword = await bcrypt.hash(barber_password, 10)

    const barberCreated = await knex('barbers').insert({
      barber_name,
      barber_email,
      barber_password: encryptedPassword,
    })

    if (barberCreated.length)
      return res
        .status(500)
        .json({ message: 'Não foi possível se conectar com o banco de dados.' })

    return res.status(200).json({ message: 'Usuário criado com sucesso.' })
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

const barberEdit = async (req, res) => {
  const {
    user_name,
    user_email,
    user_password,
    user_current_password,
  } = req.body

  const { id } = req.user

  try {
    await editUserSchema.validate(req.body)

    const message = await editBarberInfoValidator(req.body, id)

    if (message) return res.status(401).json({ message })

    if (user_current_password && !user_password)
      return res
        .status(401)
        .json({ message: 'É necessário informar a nova senha' })

    if (user_password.length) {
      if (!user_current_password)
        return res
          .status(401)
          .json({ message: 'É obrigatório informar a senha atual' })

      if (typeof user_password !== 'string')
        return res
          .status(401)
          .json({ message: 'Senha em formato não autorizado.' })

      if (user_password.length < 5)
        return res
          .status(401)
          .json({ message: 'Senha muito curta. Insira ao menos 5 caracteres.' })

      const currentPassword = await knex('barbers')
        .where({ id })
        .select('barber_password')
        .first()

      const userValidPassword = await bcrypt.compare(
        user_current_password,
        currentPassword.barber_password,
      )

      if (!userValidPassword)
        return res.status(401).json({ message: 'A senha atual está incorreta' })

      const encryptedPassword = await bcrypt.hash(user_password, 10)

      const userEditedWithPassword = await knex('barbers')
        .update({
          barber_name: user_name,
          barber_email: user_email,
          barber_password: encryptedPassword,
        })
        .where({ id })

      if (userEditedWithPassword.length)
        return res.status(500).json({
          message: 'Não foi possível conectar-se com o banco de dados.',
        })

      return res.status(200).json({ message: 'Usuário editado com sucesso.' })
    }

    const userEdited = await knex('barbers')
      .update({
        barber_name: user_name,
        barber_email: user_email,
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

const deleteBarber = async(req, res) => {
  const { id } = req.user;
  const { userPassword } = req.params;

  try {
    const currentPassword = await knex('barbers')
    .where({ id })
    .select('barber_password')
    .first()

    const userValidPassword = await bcrypt.compare(
      userPassword,
      currentPassword.barber_password,
    )

    if (!userValidPassword) {
        return res.status(401).json({ message: 'A senha informada está incorreta' })
    }

    await knex("barbers").where({ id }).del();

    return res.status(204).send();
  } catch (error) {
    return res.status(400).json({message: error.message});
  }
}

module.exports = { barberRegister, barberEdit, deleteBarber, listBarbers }
