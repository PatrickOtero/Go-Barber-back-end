const knex = require('knex')({
  client: 'pg',
  connection: {
    user: process.env.DB_LOCAL_USER || process.env.DB_SERVER_USER,
    port: 5432,
    host: process.env.DB_LOCAL_HOST || process.env.DB_SERVER_HOST,
    database: process.env.DB_LOCAL_DATABASE || process.env.DB_SERVER_DATABASE,
    password: process.env.DB_LOCAL_PASSWORD || process.env.DB_SERVER_PASSWORD,
    ssl: { rejectUnauthorized: false },
  },
})

module.exports = knex
