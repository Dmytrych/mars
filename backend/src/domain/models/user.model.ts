export type UserModel = {
  id: string;
  name: string;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
};

export const USER_TABLE_NAME = "users";
