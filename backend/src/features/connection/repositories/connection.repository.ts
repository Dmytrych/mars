import {Knex} from "knex";
import {CONNECTION_TABLE_NAME, ConnectionStatus, IConnectionModel} from "../../../domain/models/connection.model";

interface ICreateConnectionParams extends Omit<IConnectionModel, 'id' | 'createdAt'> {}

export interface IConnectionRepository {
  exists(clientId: string, trainerId: string): Promise<boolean>
  create(project: ICreateConnectionParams): Promise<IConnectionModel>
  delete(id: string): Promise<boolean>
  updateStatus(id: string, status: ConnectionStatus): Promise<IConnectionModel>
  getTrainerConnections(trainerId: string): Promise<IConnectionModel[]>
  getClientConnections(trainerId: string): Promise<IConnectionModel[]>
  get(id: string): Promise<IConnectionModel | undefined>
}

export interface IConnectionRepositoryDependencies {
  db: Knex
}

export class ConnectionRepository implements IConnectionRepository {
  private readonly db: Knex

  constructor(dependencies: IConnectionRepositoryDependencies) {
    this.db = dependencies.db;
  }

  async exists(clientId: string, trainerId: string): Promise<boolean> {
    const result = await this.db<IConnectionModel>(CONNECTION_TABLE_NAME)
      .where({
        clientId,
        trainerId
      });
    return result.length > 0;
  };

  async create(project: ICreateConnectionParams): Promise<IConnectionModel> {
    const created = await this.db<IConnectionModel>(CONNECTION_TABLE_NAME)
      .insert(project)
      .returning("*")
      .first();
    if (!created) {
      throw new Error("Error creating connection: no rows returned");
    }

    return created;
  };

  async getClientConnections(clientId: string): Promise<IConnectionModel[]> {
    return this.db<IConnectionModel>(CONNECTION_TABLE_NAME)
      .where({ clientId });
  };

  async getTrainerConnections(trainerId: string): Promise<IConnectionModel[]> {
    return this.db<IConnectionModel>(CONNECTION_TABLE_NAME)
      .where({ trainerId });
  };

  async get(id: string): Promise<IConnectionModel | undefined> {
    return this.db<IConnectionModel>(CONNECTION_TABLE_NAME).where({ id }).first();
  };

  async updateStatus(id: string, status: ConnectionStatus): Promise<IConnectionModel> {
    const models = await this.db<IConnectionModel>(CONNECTION_TABLE_NAME).where({ id }).update({
      status
    }).returning('*');

    if (models.length != 1) {
      throw new Error(`Error updating connection with id ${id}: expected 1 row to be updated, but got ${models.length}`);
    }
    return models[0];
  };

  async delete(id: string): Promise<boolean> {
    const affectedRows = await this.db<IConnectionModel>(CONNECTION_TABLE_NAME)
      .where({ id })
      .del();
    return affectedRows > 0;
  };
}
