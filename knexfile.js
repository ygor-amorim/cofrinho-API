require('dotenv').config();

  module.exports = {
    development: {
      client: 'pg',
      connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
      },
      migrations: {
        directory: './src/migrations',
      },
      seeds: {
        directory: './src/seeds',
      },
    },

    test: {
      client: 'pg',
      connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME + '_test',
      },
      migrations: {
        directory: './src/migrations',
      },
      seeds: {
        directory: './src/seeds',
      },
    },

    production: {
      client: 'pg',
      connection: process.env.DATABASE_URL,
      migrations: {
        directory: './src/migrations',
      },
    },
  };