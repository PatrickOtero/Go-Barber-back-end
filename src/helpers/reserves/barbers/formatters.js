const getReserveCompleteHour = (reserveArray) => {
    for (let reserve of reserveArray) {
      const reserveCompleteHours = `${reserve.reserve_date}`
        .split(' ')[4]
        .slice(0, 5)
  
      reserve.reserveCompleteHours = reserveCompleteHours
    }
  }
  
  const getReserveByDayPeriod = (reservesArray, calendarDate, calendarMonth) => {
    const morningReserves = reservesArray.filter(
      (reserve) =>
        reserve.reserve_date.getHours() >= 6 &&
        reserve.reserve_date.getHours() < 12 &&
        reserve.reserve_date.getDate() === calendarDate &&
        reserve.reserve_date.getMonth() === calendarMonth,
    ).sort((a, b) => a.reserve_date - b.reserve_date);
  
    const afternoonReserves = reservesArray.filter(
      (reserve) =>
        reserve.reserve_date.getHours() >= 12 &&
        reserve.reserve_date.getHours() < 18 &&
        reserve.reserve_date.getDate() === calendarDate &&
        reserve.reserve_date.getMonth() === calendarMonth,
    ).sort((a, b) => a.reserve_date - b.reserve_date);
  
    const nightReserves = reservesArray.filter(
      (reserve) =>
        reserve.reserve_date.getHours() >= 18 &&
        reserve.reserve_date.getHours() <= 20 &&
        reserve.reserve_date.getDate() === calendarDate &&
        reserve.reserve_date.getMonth() === calendarMonth,
    ).sort((a, b) => a.reserve_date - b.reserve_date);
  
    return { morningReserves, afternoonReserves, nightReserves }
  }

  module.exports = {
    getReserveCompleteHour,
    getReserveByDayPeriod,
  }