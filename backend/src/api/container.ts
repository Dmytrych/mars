import {asValue} from "awilix";
import {createDatabase} from "../domain/database";
import {AppConfig} from "../common/configuration";
import {ILogger} from "../common/types/logger";
import * as authContainer from "../features/auth/container";
import * as connectionContainer from "../features/connection/container";
import {init} from "../domain/amqp";

export default async (config: AppConfig, logger: ILogger) => {
  return {
    db: asValue(await createDatabase(config, logger)),
    appConfig: asValue(config),
    logger: asValue(logger),
    amqp: asValue(await init(config)),
    ...authContainer.load(),
    ...connectionContainer.load(),
  }
}
