import {IConnection, ICreateConnectionParams} from "../types";
import {ValidationError} from "../../../common/types/errors";
import { IConnectionRepository } from "../repositories/connection.repository";

export interface IConnectionService {
  add(params: ICreateConnectionParams): Promise<IConnection>;
  delete(id: string): Promise<boolean>;
  getClientConnections(clientId: string): Promise<IConnection[]>;
  getTrainerConnections(trainerId: string): Promise<IConnection[]>;
  accept(connectionId: string): Promise<IConnection>
  reject(connectionId: string): Promise<IConnection>
}

export interface IConnectionServiceDependencies {
  connectionRepository: IConnectionRepository;
}

export class ConnectionService implements IConnectionService {
  private readonly connectionRepository: IConnectionRepository;

  constructor(dependencies: IConnectionServiceDependencies) {
    this.connectionRepository = dependencies.connectionRepository;
  }

  async add(params: ICreateConnectionParams): Promise<IConnection> {
    const exists = await this.connectionRepository.exists(params.clientId, params.trainerId);

    if (exists) {
      throw new ValidationError('Connection already exists');
    }

    return this.connectionRepository.create(params);
  }

  async delete(id: string): Promise<boolean> {
    return this.connectionRepository.delete(id);
  }

  async accept(connectionId: string): Promise<IConnection> {
    return this.updateStatus(connectionId, 'accepted');
  }

  async reject(connectionId: string): Promise<IConnection> {
    return this.updateStatus(connectionId, 'rejected');
  }

  private async updateStatus(connectionId: string, status: 'accepted' | 'rejected'): Promise<IConnection> {
    const connection = await this.connectionRepository.get(connectionId);

    if (!connection) {
      throw new ValidationError('Connection not found');
    }

    return this.connectionRepository.updateStatus(connectionId, status);
  }

  getClientConnections(clientId: string): Promise<IConnection[]> {
    return this.connectionRepository.getClientConnections(clientId);
  }

  getTrainerConnections(trainerId: string): Promise<IConnection[]> {
    return this.connectionRepository.getTrainerConnections(trainerId);
  }
}
