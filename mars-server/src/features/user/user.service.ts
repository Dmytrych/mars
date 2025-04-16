import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserLoginResult, UserRegistrationResult } from "./user.types";
import { ValidationResult } from "../../common/validation-result";
import { IUserRepository } from "./user.repository";
import { AppConfig } from "../configuration";

export interface IUserService {
  register(email: string, password: string, name: string): Promise<UserRegistrationResult>;
  login(email: string, password: string): Promise<ValidationResult<UserLoginResult>>;
}

export class UserService implements IUserService {
  constructor(private readonly userRepository: IUserRepository, private readonly appConfig: AppConfig) {}

  async register(email: string, password: string, name: string): Promise<UserRegistrationResult> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.userRepository.createUser({ email, password: hashedPassword, name });

    return {
      id: user.id,
      email: user.email,
      name: user.name,
    };
  }

  async login(email: string, password: string): Promise<ValidationResult<UserLoginResult>> {
    const user = await this.userRepository.getLoginUser(email);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return {
        success: false,
        error: {
          message: "Invalid credentials",
        },
      };
    }

    const accessToken = jwt.sign({ id: user.id, email: user.email }, this.appConfig.api.auth.jwtSecret, { expiresIn: "1h" });

    return {
      success: true,
      data: {
        accessToken,
      },
    };
  }
}
