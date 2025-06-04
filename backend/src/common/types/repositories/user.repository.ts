import {UserModel} from "../../../domain/models/user.model";

export interface IUserCreateParams extends Omit<UserModel, 'id' | 'created_at' | 'updated_at'> {}

export interface IUserRepository {
  getUser(email: string): Promise<UserModel | undefined>;
  createUser(user: IUserCreateParams): Promise<UserModel>;
  usersExist(userIds: string[]): Promise<boolean>
}
