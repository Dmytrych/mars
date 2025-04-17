import knex from 'knex';
import {AppConfig} from "../features/configuration";

export const createDatabase = (config: AppConfig) => {
  const dbConfig = {
    client: "pg",
    connection: {
      host: config.db.host,
      port: config.db.port,
      user: config.db.user,
      password: config.db.password,
      database: config.db.database,
    }
  }
  return knex(dbConfig);
}
