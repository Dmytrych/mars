import {AppConfig} from "../common/configuration";
import {ILogger} from "../common/types/logger";
import { PrismaClient } from '../../generated/prisma';

export const createDatabase = async (appConfig: AppConfig, logger: ILogger) => {
  const prisma = new PrismaClient()

  logger.info('Database client created');

  return prisma
}
