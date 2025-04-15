import db from "../../database/database";
import {USER_TABLE_NAME, UserModel} from "../../database/models/user.model";

export const getLoginUser = async (email: string) => {
  return db<UserModel>(USER_TABLE_NAME)
    .select("*")
    .where({ email })
    .first();
}

export const createUser = async (user: { email: string; password: string; name: string }) => {
  const [createdUser] = await db<UserModel>(USER_TABLE_NAME)
    .insert(user)
    .returning(["id", "email", "name"]);
  return createdUser;
};

