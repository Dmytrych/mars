import {USER_TABLE_NAME, UserModel} from "../../../database/models/user.model";
import {Knex} from "knex";

export interface IUserRepository {
  getLoginUser(email: string): Promise<UserModel | undefined>;
  createUser(user: { email: string; password: string; name: string }): Promise<UserModel>;
}

export type UserRepositoryDependencies = {
  db: Knex
}

export class UserRepository implements IUserRepository {
  private readonly db: Knex

  constructor(dependencies: UserRepositoryDependencies) {
    this.db = dependencies.db;
  }

  async getLoginUser(email: string) {
    return this.db<UserModel>(USER_TABLE_NAME)
      .select("*")
      .where({ email })
      .first();
  }

  async createUser(user: { email: string; password: string; name: string }) {
    const [createdUser] = await this.db<UserModel>(USER_TABLE_NAME)
      .insert(user)
      .returning("*");
    return createdUser;
  };
}

