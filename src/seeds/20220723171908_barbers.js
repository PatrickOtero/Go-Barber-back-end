const bcrypt = require('bcrypt')

exports.seed = async function(knex) {
  const testUser = {
    id: 1,
    barber_name: 'Cabeleireiro',
    barber_email: 'cabeleireiro@gmail.com',
    barber_password: 'cabeleireiro123',
  };

  const table = 'barbers';

  const insertedUser = await knex(table)
    .where({ barber_email: testUser.barber_email })
    .first();


    const encryptedPassword = await bcrypt.hash(testUser.barber_password, 10)

    testUser.barber_password = encryptedPassword;

    if (!insertedUser) {
      await knex(table).insert(testUser);
  }
};