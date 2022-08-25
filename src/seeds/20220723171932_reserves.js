exports.seed = async function(knex) {
 
  const reserves = {
    id: 1,
    reserve_date: "2022-08-25 09:20:00",
    customer_id: 1,
    barber_id: 1,
    created_at: new Date()
  }

  await knex('reserves').del()
  await knex('reserves').insert(reserves);
};

