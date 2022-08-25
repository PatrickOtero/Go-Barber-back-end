const { recoverSecret } = require('../../hashPass')
const nodemailer = require('../../services/nodemailer')
const bcrypt = require("bcrypt")
const knex = require('../../connection')
const jwt = require("jsonwebtoken");

const sendRecoverEmail = async (req, res) => {
  const { user_email } = req.body

  if (!user_email) {
    return res.status(400).json({message: "Por favor, informe o e-mail da conta que deseja recuperar"})
  }

  try {
    const customerExists = await knex("customers").where({customer_email: user_email}).first();

    const barberExists = await knex("barbers").where({barber_email: user_email}).first();

    if (!barberExists && !customerExists) {
      return res.status(404).json({message: "Conta de usuário inexistente."});
    }

    const user = customerExists || barberExists;

    const token = jwt.sign(
      { id: user.id },
      recoverSecret,
      {
       expiresIn: '5h',
      },
    )

    const localRestoreLink = "http://localhost:3000/newpass"
    // const serverRestoreLink = "https://patrickotero-gobarber.netlify.app/newpass"

    const userName = user.customer_name || user.barber_name
    const restorePassLink = localRestoreLink;
   
    const sendData = {
      from: 'Time GoBarber <nao-responder@gobarber.com.br>',
      to: user_email,
      subject: 'Redefinição de senha',
      template: 'forgetPass',
      context: {
          userName,
          restorePassLink,
      },
    }
    nodemailer.sendMail(sendData)

    return res.status(200).json({message: "Sucesso. Procure em sua caixa de entrada de e-mails pelo link de recuperação", token});
  } catch (error) {
    return res.status(400).json({message: error.message})
  }
}

const setNewPass = async (req, res) => {
  const { user_password } = req.body
  let { authorization } = req.headers

  if (!authorization) return res.status(401).json({ message: 'Não autorizado' })

  if(!user_password) {
    return res.status(400).json({message: "Por favor, insira a nova senha desejada"})
  }

  try {
    const token = authorization.replace('Bearer ', '').trim()

    const { id } = jwt.verify(token, recoverSecret)
  
    const customerExists = await knex('customers').where({ id }).first()

    const barberExists = await knex('barbers').where({ id }).first()

    if (!barberExists && !customerExists)
      return res.status(404).json({ message: 'Usuário não encontrado' })
      
    const encryptedPassword = await bcrypt.hash(user_password, 10)

    if(customerExists) {
      await knex("customers").update({
        customer_password: encryptedPassword
      }).where({id})
    } else {
      await knex("barbers").update({
        barber_password: encryptedPassword
      }).where({id})
    }

    req.user = customerExists || barberExists;

    return res.status(200).json({message: "Sucesso"});
  } catch (error) {
    return res.status(400).json({message: error.message})
  }
}

module.exports = { sendRecoverEmail, setNewPass }