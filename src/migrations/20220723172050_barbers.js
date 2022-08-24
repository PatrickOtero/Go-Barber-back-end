exports.up = function(knex) {
    return knex.schema
    .createTable('barbers', function (table) {
        table.increments('id');
        table.string('barber_name', 50).notNullable();
        table.text('barber_email').notNullable();
        table.text("barber_password").notNullable();
    })
};


exports.down = function(knex) {
  return knex.schema
  .dropTable("barbers");
};
