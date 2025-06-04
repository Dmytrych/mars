import {USER_TABLE_NAME, UserModel} from "../../../domain/models/user.model";
import {Knex} from "knex";
import {IUserCreateParams, IUserRepository} from "../../../common/types/repositories/user.repository";

export type UserRepositoryDependencies = {
  db: Knex
}

export class UserRepository implements IUserRepository {
  private readonly db: Knex

  constructor(dependencies: UserRepositoryDependencies) {
    this.db = dependencies.db;
  }

  async getUser(email: string) {
    return this.db<UserModel>(USER_TABLE_NAME)
      .select("*")
      .where({ email })
      .first();
  }

  async createUser(user: IUserCreateParams): Promise<UserModel> {
    const [createdUser] = await this.db<UserModel>(USER_TABLE_NAME)
      .insert(user)
      .returning("*");
    return createdUser;
  };

  async usersExist(userIds: string[] = []): Promise<boolean> {
    const result = await this.db<UserModel>(USER_TABLE_NAME)
      .select('id')
      .whereIn("id", userIds);
    return result.length === userIds.length;
  };
}

