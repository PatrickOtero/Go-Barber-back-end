const customerDateFormatter = (array) => {
    const weekDays = [
        'Domingo',
        'Segunda',
        'Terça',
        'Quarta',
        'Quinta',
        'Sexta',
        'Sábado',
      ]
    
      const months = [
        'Janeiro',
        'Fevereiro',
        'Março',
        'Abril',
        'Maio',
        'Junho',
        'Julho',
        'Agosto',
        'Setembro',
        'Outubro',
        'Novembro',
        'Dezembro',
      ]

    array.forEach(date => {
        const day = date.reserve_date.getDate()
        const weekDay = date.reserve_date.getDay()
        const month = date.reserve_date.getMonth()
        const hour = date.reserve_date.getHours()
        const minutes = date.reserve_date.getMinutes()

        const formattedMinutes = `${minutes}`.padStart(2, "0")

        date.reserve_date = `${weekDays[weekDay]}, dia ${day} de ${months[month]} às ${hour}:${formattedMinutes}`
    });
}

  module.exports = {
    customerDateFormatter
  }