import {ConnectionStatus, IConnectionModel, IUserModel} from "./models";

export interface IUserCreateParams extends Omit<IUserModel, 'id' | 'created_at' | 'updated_at'> {}

export interface IUserDataSource {
  getUser(email: string): Promise<IUserModel | null>;
  createUser(user: IUserCreateParams): Promise<IUserModel>;
  usersExist(userIds: string[]): Promise<boolean>
}

export interface ICreateConnectionParams extends Omit<IConnectionModel, 'id' | 'createdAt'> {}

export interface IConnectionDataSource {
  exists(clientId: string, trainerId: string): Promise<boolean>
  create(project: ICreateConnectionParams): Promise<IConnectionModel>
  delete(id: string): Promise<boolean>
  updateStatus(id: string, status: ConnectionStatus): Promise<IConnectionModel>
  getTrainerConnections(trainerId: string): Promise<IConnectionModel[]>
  getClientConnections(trainerId: string): Promise<IConnectionModel[]>
  get(id: string): Promise<IConnectionModel | null>
}
