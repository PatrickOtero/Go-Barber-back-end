module.exports = {

    client: 'pg',
    connection: {
      user: process.env.DB_LOCAL_USER,
      host: process.env.DB_LOCAL_HOST,
      database: process.env.DB_LOCAL_DATABASE,
      password: process.env.DB_LOCAL_PASSWORD,
    },
    migrations: {
      directory: "src/migrations",
      extension: "js",
    },
    seeds: { 
      directory: "src/seeds",
      extension: "js",
      timestampFilenamePrefix: true, 
      },
}
