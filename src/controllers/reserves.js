const {
  createReserveSchema,
} = require('../validations/reserves/reserveSchemas')
const knex = require('../connection')
const {
  getReserveByDayPeriod,
  getReserveCompleteHour,
} = require('../helpers/reserves/barbers/formatters')
const { differenceInSeconds } = require('date-fns')
const { customerDateFormatter } = require('../helpers/reserves/customers/formatters')

const barberReservesList = async (req, res) => {
  const { id } = req.user
  let { currentDate, currentMonth } = req.query

  try {
    const reservesList = await knex('reserves')
      .leftJoin('customers', 'customers.id', 'reserves.customer_id')
      .where({ barber_id: id })
      .select(
        'reserves.id',
        'customers.customer_name',
        'customers.customer_email',
        'reserves.reserve_date',
        "reserves.canceled"
      )

    if (!reservesList.length)
      return res.status(404).json({ message: 'A lista de reserva está vazia' })

    if (!currentDate) currentDate = new Date().getDate()
    if (!currentMonth) currentMonth = new Date().getMonth()

    getReserveCompleteHour(reservesList)

    const {
      morningReserves,
      afternoonReserves,
      nightReserves,
    } = getReserveByDayPeriod(
      reservesList,
      Number(currentDate),
      Number(currentMonth),
    )

    const nextAttendance = reservesList
      .filter(
        (reserve) =>
          differenceInSeconds(new Date(reserve.reserve_date), new Date()) > 0,
      )
      .sort((a, b) => a.reserve_date - b.reserve_date)[0]

    return res.status(200).json({
      nextAttendance,
      morningReserves,
      afternoonReserves,
      nightReserves,
    })
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

const customerReservesList = async (req, res) => {
  const { id } = req.user

  try {
    const reservesList = await knex('reserves')
      .leftJoin('barbers', 'barbers.id', 'reserves.barber_id')
      .where({ customer_id: id })
      .select(
        'reserves.id',
        "reserves.barber_id",
        'barbers.barber_name',
        'barbers.barber_email',
        'reserves.reserve_date',
        "reserves.canceled",
        "reserves.cancelreason"
      )

    if (!reservesList.length)
      return res.status(404).json({ message: 'A lista de reserva está vazia' })

      const incomingAppointments = reservesList
      .filter(
        (reserve) =>
          differenceInSeconds(reserve.reserve_date, new Date()) >= 0,
      )
      .sort((a, b) => a.reserve_date - b.reserve_date)

    customerDateFormatter(reservesList)

    return res.status(200).json({
      reservesList: incomingAppointments,
    })

  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

const reserveRegister = async (req, res) => {
  const { date_day, date_month, date_year, date_hour, date_minutes } = req.body
  const { barberId } = req.params
  const { id } = req.user
  try {
    await createReserveSchema.validate(req.body)

    const barberExists = await knex('barbers').where({ id: barberId }).first()

    if (!barberExists)
      return res.status(404).json({ message: 'Barbeiro não encontrado' })

    const reserve_date = `${date_year}-${date_month}-${date_day} ${date_hour}:${date_minutes}`

    const reserveDateExists = await knex("reserves").where({ reserve_date }).first()

    if (reserveDateExists) {
      return res.status(400).json({message: "Esta data já foi reservada"})
    }
      
    const reserveCreated = await knex('reserves').insert({
      reserve_date,
      customer_id: id,
      barber_id: barberId,
      created_at: new Date()
    })

    if (reserveCreated.length)
      return res
        .status(500)
        .json({ message: 'Não foi possível se conectar com o banco de dados.' })

    return res.status(200).json({ message: 'Reserva criada com sucesso.' })
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

const editReserve = async(req, res) => {
  const { reserveId } = req.params;
  const { date_day, date_month, date_year, date_hour, date_minutes } = req.body

  const reserveExists = await knex("reserves").where({ id: reserveId }).first()

  if (!reserveExists) {
    return res.status(404).json({ message: "Essa reserva não existe"})
  }

  const reserve_date = `${date_year}-${date_month}-${date_day} ${date_hour}:${date_minutes}`

  const reserveDateExists = await knex("reserves").where({ reserve_date }).first()

  if (reserveDateExists) {
    return res.status(400).json({message: "Esta data já foi reservada"})
  }

  try {

  await knex("reserves").where({ id: reserveId }).update({
    reserve_date,
  });

  return res.status(200).json({ message: "Reserva editada com sucesso."})

  } catch (error) {
    return res.status(400).json({ message: error.message});
  }
}

const deleteReserve = async(req, res) => {
  const { reserveId } = req.params;

  try {
  const reserveExists = await knex("reserves").where({ id: reserveId }).first()

  if (!reserveExists) {
    return res.status(404).json({ message: "Essa reserva não existe"})
  }

  await knex("reserves").where({ id: reserveId }).del();

  return res.status(200).json({ message: "Reserva deletada com sucesso."})

  } catch (error) {
    return res.status(400).json({ message: error.message});
  }
}

const cancelReserve = async(req, res) => {
  const { reserveId } = req.params;
  const { cancelReason } = req.body;

  if (!cancelReason) {
    return res.status(400).json({message: "Por favor, informe o motivo do cancelamento"});
  }

  try {
  const reserveExists = await knex("reserves").where({ id: reserveId }).first()

  if (!reserveExists) {
    return res.status(404).json({ message: "Essa reserva não existe"})
  }

    await knex('reserves')
    .update({
      canceled: true,
      cancelReason
    })
    .where({ id: reserveId })

  return res.status(200).json({message: "Reserva cancelada com sucesso"})

  } catch (error) {
    return res.status(400).json({ message: error.message});
  }
}

module.exports = { barberReservesList, customerReservesList, reserveRegister, editReserve, deleteReserve, cancelReserve }
