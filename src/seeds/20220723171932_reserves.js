exports.seed = async function(knex) {
 
  const reserves = {
    id: 1,
    reserve_date: "2022-07-24 09:20:00",
    customer_id: 1,
    barber_id: 1,
  }

  await knex('reserves').del()
  await knex('reserves').insert(reserves);
};

