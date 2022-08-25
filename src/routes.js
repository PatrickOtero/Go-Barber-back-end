const { Router } = require('express')
const {
  barberRegister,
  barberEdit,
  listBarbers,
  deleteBarber,
} = require('./controllers/barbers')
const { customerRegister, customerEdit, deleteCustomer } = require('./controllers/customers')
const { sendRecoverEmail, setNewPass } = require('./controllers/email/userRestoreAccount')
const { reserveRegister, customerReservesList, barberReservesList, deleteReserve, cancelReserve, editReserve } = require('./controllers/reserves')
const { userLogin } = require('./controllers/usersLogin')
const { barberValidation } = require('./middlewares/barberValidator')
const { customerValidation } = require('./middlewares/customerValidator')

const router = Router()

// Users Login
router.post('/user/login', userLogin)

// Customers
router.post('/customer/register', customerRegister)

// Barbers
router.post('/barber/register', barberRegister)

// Account recovering
router.post('/user/recoverPass', sendRecoverEmail)
router.post('/user/newPass', setNewPass)

// Route validation middlewares //
router.use('/barber', barberValidation)
router.use('/customer', customerValidation)
// Route validation middlewares //

// Customers
router.put('/customer/edit', customerEdit)
router.get('/customer/barbers/list', listBarbers)
router.delete('/customer/delete/:userPassword', deleteCustomer)

// Barbers
router.put('/barber/edit', barberEdit)
router.delete('/barber/delete/:userPassword', deleteBarber)

// Reserves
router.get('/barber/reserves/list', barberReservesList)
router.get('/customer/reserves/list', customerReservesList)
router.post('/customer/reserves/create/:barberId', reserveRegister)
router.post('/barber/reserves/cancel/:reserveId', cancelReserve)
router.put("/customer/reserves/edit/:reserveId", editReserve)
router.delete("/customer/reserves/:reserveId", deleteReserve)

module.exports = router
