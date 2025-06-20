import {IConnection, ICreateConnectionParams} from "../types";
import {ValidationError} from "../../../common/types/errors";
import { IConnectionRepository } from "../repositories/connection.repository";
import {DbError, UNIQUE_VIOLATION_ERROR} from "../../../common/errors/db-errors";
import {INotificationService} from "./notification.service";
import {IUserRepository} from "../../auth/repositories/user.repository";

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
  userRepository: IUserRepository;
  notificationService: INotificationService;
}

export class ConnectionService implements IConnectionService {
  private readonly connectionRepository: IConnectionRepository;
  private readonly userRepository: IUserRepository;
  private readonly notificationService: INotificationService;

  constructor(dependencies: IConnectionServiceDependencies) {
    this.connectionRepository = dependencies.connectionRepository;
    this.userRepository = dependencies.userRepository;
    this.notificationService = dependencies.notificationService
  }

  async add(params: ICreateConnectionParams): Promise<IConnection> {
    const usersExist = await this.userRepository.usersExist([params.trainerId, params.clientId])

    if (!usersExist) {
      throw new ValidationError('User does not exist');
    }

    const connection = await this.connectionRepository.create({ ...params, status: 'PENDING' })
      .catch((err: DbError) => {
        if (err.constraint === UNIQUE_VIOLATION_ERROR) {
          throw new ValidationError('Connection already exists');
        }
        throw new Error(err.message, err);
      });
    await this.notificationService.send()

    return connection
  }

  async delete(id: string): Promise<boolean> {
    return this.connectionRepository.delete(id);
  }

  async accept(connectionId: string): Promise<IConnection> {
    return this.updateStatus(connectionId, 'ACCEPTED');
  }

  async reject(connectionId: string): Promise<IConnection> {
    return this.updateStatus(connectionId, 'REJECTED');
  }

  private async updateStatus(connectionId: string, status: 'ACCEPTED' | 'REJECTED'): Promise<IConnection> {
    return this.connectionRepository.updateStatus(connectionId, status)
  }

  getClientConnections(clientId: string): Promise<IConnection[]> {
    return this.connectionRepository.getClientConnections(clientId);
  }

  getTrainerConnections(trainerId: string): Promise<IConnection[]> {
    return this.connectionRepository.getTrainerConnections(trainerId);
  }
}
