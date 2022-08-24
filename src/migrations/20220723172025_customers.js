exports.up = function(knex) {
    return knex.schema
    .createTable('customers', function (table) {
        table.increments('id');
        table.string('customer_name', 50).notNullable();
        table.text('customer_email').notNullable();
        table.text('customer_password').notNullable();
    })
};


exports.down = function(knex) {
  return knex.schema
  .dropTable("customers");
};
