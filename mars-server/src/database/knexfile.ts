import type { Knex } from "knex";

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "pg",
    connection: {
      database: "mars_db",
      user: "username",
      password: "password"
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./src/database/migrations", // Updated to use a relative path
    }
  },
};

export default config;

