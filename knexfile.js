// Update with your config settings.
require("dotenv").config();

module.exports = {
  development: {
    client: "postgresql",
    searchPath: "public",
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT,
      ssl: false
    },
    migrations: {
      directory: "./db/migrations",
      tableName: "migrations"
    },
    seeds: {
      directory: "./db/seeds"
    }
  },

  production: {
    client: "postgresql",
    connection: process.env.DATABASE_URL + "?ssl=false",
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "migrations"
    }
  }
};
