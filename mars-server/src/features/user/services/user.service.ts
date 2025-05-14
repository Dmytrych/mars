import bcrypt from "bcrypt";
import { createSigner } from "fast-jwt";
import { UserLoginResult, UserRegistrationResult } from "../user.types";
import { ValidationResult } from "../../../common/validation-result";
import { IUserRepository } from "../repositories/user.repository";
import { AppConfig } from "../../configuration";
import {ILogger} from "../../../common/logger";

export interface IUserService {
  register(email: string, password: string, name: string): Promise<UserRegistrationResult>;
  login(email: string, password: string): Promise<ValidationResult<UserLoginResult>>;
}

export type UserServiceDependencies = {
  userRepository: IUserRepository;
  appConfig: AppConfig;
  logger: ILogger;
}

export class UserService implements IUserService {
  private readonly userRepository: IUserRepository
  private readonly appConfig: AppConfig
  private readonly logger: ILogger

  constructor(dependencies: UserServiceDependencies) {
    this.userRepository = dependencies.userRepository
    this.appConfig = dependencies.appConfig
    this.logger = dependencies.logger
  }

  async register(email: string, password: string, name: string): Promise<UserRegistrationResult> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.userRepository.createUser({ email, password: hashedPassword, name });

    this.logger.info(`User registered: ${user.email}`);

    return {
      id: user.id,
      email: user.email,
      name: user.name,
    };
  }

  async login(email: string, password: string): Promise<ValidationResult<UserLoginResult>> {
    const user = await this.userRepository.getLoginUser(email);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      this.logger.info(`Failed login: ${email}`);

      return {
        success: false,
        error: {
          message: "Invalid credentials",
        },
      };
    }

    console.log(user)

    this.logger.info(`Login success: ${email}`);
    const signer = createSigner({
      key: this.appConfig.api.auth.jwtSecret,
      expiresIn: this.appConfig.api.auth.jwtLifespanSeconds * 1000,
    });
    const accessToken = signer({ id: user.id, email: user.email });

    return {
      success: true,
      data: {
        user: {
          id: user.id.toString(),
          name: user.name,
          email: user.email,
        },
        accessToken,
      },
    };
  }
}
