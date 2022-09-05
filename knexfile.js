module.exports = {

    client: 'pg',
    connection: {
      user: process.env.DB_LOCAL_USER || process.env.DB_SERVER_USER,
      host: process.env.DB_LOCAL_HOST || process.env.DB_SERVER_HOST,
      database: process.env.DB_LOCAL_DATABASE || process.env.DB_SERVER_DATABASE,
      password: process.env.DB_LOCAL_PASSWORD || process.env.DB_SERVER_PASSWORD,
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
