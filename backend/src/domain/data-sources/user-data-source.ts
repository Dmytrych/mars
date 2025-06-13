import {PrismaClient} from "../../../generated/prisma";
import {IUserCreateParams, IUserDataSource} from "../../common/types/domain/data-sources";
import {IUserModel} from "../../common/types/domain/models";

export type UserDataSourceDependencies = {
  db: PrismaClient
}

export class UserDataSource implements IUserDataSource {
  private readonly db: PrismaClient

  constructor(dependencies: UserDataSourceDependencies) {
    this.db = dependencies.db;
  }

  async getUser(email: string): Promise<IUserModel | null> {
    return this.db.user.findFirst({
      where: {
        email
      }
    })
  }

  async createUser(user: IUserCreateParams): Promise<IUserModel> {
    return this.db.user.create({
      data: {
        ...user,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    });
  };

  async usersExist(userIds: string[] = []): Promise<boolean> {
    return (await this.db.user.findMany({
      where: {
        id: {
          in: userIds
        }
      },
      select: {
        id: true
      }
    })).length === userIds.length
  };
}

