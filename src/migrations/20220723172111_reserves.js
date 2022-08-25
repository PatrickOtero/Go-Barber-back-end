exports.up = function(knex) {
    return knex.schema
    .createTable('reserves', function (table) {
        table.increments('id');
        table.timestamp('reserve_date').notNullable();
        table.integer('customer_id').notNullable();
        table.integer("barber_id").notNullable();
        table.boolean("canceled").notNullable().default(false);
        table.text("cancelReason").notNullable().default("");
        table.dateTime("created_at").notNull();
    })
  };
  
  
  exports.down = function(knex) {
  return knex.schema
  .dropTable("reserves");
  };
