const bcrypt = require('bcrypt')

exports.seed = async function(knex) {
  const testUser = {
    id: 1,
    barber_name: 'Marcus Aurelius',
    barber_email: 'marcus@gmail.com',
    barber_password: 'marcus123',
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