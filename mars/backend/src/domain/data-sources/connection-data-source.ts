import {Prisma, PrismaClient} from "../../../generated/prisma";
import { IConnectionDataSource, ICreateConnectionParams } from "../../common/types/domain/data-sources";
import {ConnectionStatus, IConnectionModel} from "../../common/types/domain/models";
import {toGeneralDbError} from "../../common/errors/db-errors";

export interface IConnectionDataSourceDependencies {
  db: PrismaClient
}

export class ConnectionDataSource  implements IConnectionDataSource {
  private readonly db: PrismaClient

  constructor(dependencies: IConnectionDataSourceDependencies) {
    this.db = dependencies.db;
  }

  async exists(clientId: string, trainerId: string): Promise<boolean> {
    const result = await this.db.connection.findFirst({
      where: {
        clientId,
        trainerId
      },
      select: {
        id: true
      }
    })
    return Boolean(result);
  };

  async create(project: ICreateConnectionParams): Promise<IConnectionModel> {
    return this.db.connection.create({
      data: {
        ...project,
        createdAt: new Date(),
      }
    }).catch((err: Prisma.PrismaClientKnownRequestError) => {
      throw toGeneralDbError(err);
    });
  };

  async getClientConnections(clientId: string): Promise<IConnectionModel[]> {
    return this.db.connection.findMany({
      where: {
        clientId
      }
    })
  };

  async getTrainerConnections(trainerId: string): Promise<IConnectionModel[]> {
    return this.db.connection.findMany({
      where: {
        trainerId
      }
    })
  };

  async get(id: string): Promise<IConnectionModel | null> {
    return this.db.connection.findFirst({
      where: {
        id
      }
    })
  };

  async updateStatus(id: string, status: ConnectionStatus): Promise<IConnectionModel> {
    return this.db.connection.update({
      where: {
        id
      },
      data: {
        status,
      }
    })
  };

  async delete(id: string): Promise<boolean> {
    const data = this.db.connection.delete({
      where: {
        id
      },
      select: {
        id: true
      }
    })

    return Boolean(data)
  };
}


