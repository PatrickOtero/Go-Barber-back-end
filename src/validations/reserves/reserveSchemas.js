const yup = require('../configurations')

const createReserveSchema = yup.object().shape({
  date_day: yup
  .string()
  .required('É necessário escolher a data de agendamento'),
  date_month: yup
  .string()
  .required('É necessário escolher a data de agendamento'),
  date_year: yup
  .string()
  .required('É necessário escolher a data de agendamento'),
  date_hour: yup
  .string()
  .required('É necessário escolher a data de agendamento'),
  date_minutes: yup
  .string()
  .required('É necessário escolher a data de agendamento')
})

module.exports = { createReserveSchema }
