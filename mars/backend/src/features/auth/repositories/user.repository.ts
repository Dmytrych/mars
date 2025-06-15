import {IUserCreateParams, IUserDataSource} from "../../../common/types/domain/data-sources";
import {IUserModel} from "../../../common/types/domain/models";

export interface IUserRepository {
  getUser(email: string): Promise<IUserModel | null>;
  createUser(user: IUserCreateParams): Promise<IUserModel>;
  usersExist(userIds: string[]): Promise<boolean>
}

export type UserRepositoryDependencies = {
  userDataSource: IUserDataSource
}

export class UserRepository implements IUserRepository {
  private readonly userDataSource: IUserDataSource

  constructor(dependencies: UserRepositoryDependencies) {
    this.userDataSource = dependencies.userDataSource;
  }

  async getUser(email: string) {
    return this.userDataSource.getUser(email);
  }

  async createUser(user: IUserCreateParams): Promise<IUserModel> {
    return this.userDataSource.createUser(user);
  };

  async usersExist(userIds: string[] = []): Promise<boolean> {
    return this.userDataSource.usersExist(userIds);
  };
}

