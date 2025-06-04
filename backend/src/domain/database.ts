import knex from 'knex';
import {AppConfig} from "../common/configuration";
import {ILogger} from "../common/logger";

export const createDatabase = async (appConfig: AppConfig, logger: ILogger) => {
  const dbConfig = {
    client: "pg",
    connection: {
      host: appConfig.db.host,
      port: appConfig.db.port,
      user: appConfig.db.user,
      password: appConfig.db.password,
      database: appConfig.db.database,
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./src/domain/migrations", // Updated to use a relative path
    },
    seeds: {
      directory: "./src/domain/seeds",
    },
  }

  const knexInstance = knex(dbConfig)

  await knexInstance.migrate.latest()
    .then(() => {
      logger.info('Database migrations completed successfully');
    })
    .catch((err) => {
      logger.error('Database migrations failed:', err);
      throw new Error('Database migration failed');
    });

  return knexInstance
}
