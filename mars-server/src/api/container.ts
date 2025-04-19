import {asValue} from "awilix";
import {createDatabase} from "../database/database";
import {AppConfig} from "../features/configuration";
import {ILogger} from "../common/logger";
import * as userContainer from "../features/user/user.container";

export default (config: AppConfig, logger: ILogger) => {
  return {
    db: asValue(createDatabase(config)),
    appConfig: asValue(config),
    logger: asValue(logger),
    ...userContainer.load()
  }
}
