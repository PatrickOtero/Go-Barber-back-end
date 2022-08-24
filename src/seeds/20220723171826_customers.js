const bcrypt = require('bcrypt')

exports.seed = async function(knex) {
  const testUser = {
    id: 1,
    customer_name: 'Chard William',
    customer_email: 'chard@gmail.com',
    customer_password: 'chard123',
  };

  const table = 'customers';

  const insertedUser = await knex(table)
    .where({ customer_email: testUser.customer_email })
    .first();


    const encryptedPassword = await bcrypt.hash(testUser.customer_password, 10)

    testUser.customer_password = encryptedPassword;
    
    if (!insertedUser) {
     await knex(table).insert(testUser);
  }
};

