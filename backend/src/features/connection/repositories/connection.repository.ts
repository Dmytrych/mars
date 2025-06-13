import {ConnectionStatus, IConnectionModel} from "../../../common/types/domain/models";
import {IConnectionDataSource} from "../../../common/types/domain/data-sources";

interface ICreateConnectionParams extends Omit<IConnectionModel, 'id' | 'createdAt'> {}

export interface IConnectionRepository {
  exists(clientId: string, trainerId: string): Promise<boolean>
  create(project: ICreateConnectionParams): Promise<IConnectionModel>
  delete(id: string): Promise<boolean>
  updateStatus(id: string, status: ConnectionStatus): Promise<IConnectionModel>
  getTrainerConnections(trainerId: string): Promise<IConnectionModel[]>
  getClientConnections(trainerId: string): Promise<IConnectionModel[]>
  get(id: string): Promise<IConnectionModel | null>
}

export interface IConnectionRepositoryDependencies {
  connectionDataSource: IConnectionDataSource
}

export class ConnectionRepository implements IConnectionRepository {
  private readonly connectionDataSource: IConnectionDataSource

  constructor(dependencies: IConnectionRepositoryDependencies) {
    this.connectionDataSource = dependencies.connectionDataSource;
  }

  async exists(clientId: string, trainerId: string): Promise<boolean> {
    return this.connectionDataSource.exists(clientId, trainerId);
  };

  async create(connectionParams: ICreateConnectionParams): Promise<IConnectionModel> {
    return this.connectionDataSource.create(connectionParams);
  };

  async getClientConnections(clientId: string): Promise<IConnectionModel[]> {
    return this.connectionDataSource.getClientConnections(clientId);
  };

  async getTrainerConnections(trainerId: string): Promise<IConnectionModel[]> {
    return this.connectionDataSource.getTrainerConnections(trainerId);
  };

  async get(id: string): Promise<IConnectionModel | null> {
    return this.connectionDataSource.get(id);
  };

  async updateStatus(id: string, status: ConnectionStatus): Promise<IConnectionModel> {
    return this.connectionDataSource.updateStatus(id, status);
  };

  async delete(id: string): Promise<boolean> {
    return this.connectionDataSource.delete(id);
  };
}
