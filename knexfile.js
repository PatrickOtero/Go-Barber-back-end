module.exports = {

    client: 'pg',
    connection: {
      user: 'postgres',
      host: 'localhost',
      database: 'gobarber',
      password: 'newLife10',
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
