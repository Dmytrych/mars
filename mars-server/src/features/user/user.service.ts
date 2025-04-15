import { getLoginUser, createUser } from "./user.repository";
import bcrypt from "bcrypt";

export const register = async (email: string, password: string, name: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await createUser({ email, password: hashedPassword, name });

  if (!user) {
    throw new Error("Failed to create user");
  }

  return {
    id: user.id,
    email: user.email,
    name: user.name,
  };
};

export const login = async (email: string, password: string) => {
  const user = await getLoginUser(email);

  if (!user) {
    throw new Error("User not found");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid credentials");
  }

  // Generate a token (e.g., JWT) here if needed
  return {
    accessToken: "mocked-access-token", // Replace with actual token generation logic
  };
};
