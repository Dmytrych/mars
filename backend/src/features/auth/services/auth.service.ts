import bcrypt from "bcrypt";
import { createSigner } from "fast-jwt";
import { LoginResult, RegistrationResult } from "../types";
import { ValidationResult } from "../../../common/validation-result";
import { IUserRepository } from "../repositories/user.repository";
import { AppConfig } from "../../../common/configuration";
import { ILogger } from "../../../common/logger";
import { AuthError } from "../errors";

export interface IAuthService {
  register(email: string, password: string, name: string): Promise<RegistrationResult>;
  login(email: string, password: string): Promise<ValidationResult<LoginResult>>;
}

export type AuthServiceDependencies = {
  userRepository: IUserRepository;
  appConfig: AppConfig;
  logger: ILogger;
}

export class AuthService implements IAuthService {
  private readonly userRepository: IUserRepository
  private readonly appConfig: AppConfig
  private readonly logger: ILogger

  constructor(dependencies: AuthServiceDependencies) {
    this.userRepository = dependencies.userRepository
    this.appConfig = dependencies.appConfig
    this.logger = dependencies.logger
  }

  async register(email: string, password: string, name: string): Promise<RegistrationResult> {
    const existingUser = await this.userRepository.getUser(email);

    if (existingUser) {
      throw new AuthError("User already exist");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.userRepository.createUser({ email, password: hashedPassword, name });

    if (!user) {
      throw new Error("User creation failed");
    }

    this.logger.info(`User registered: ${user.email}`);

    return {
      id: user.id.toString(),
      email: user.email,
      name: user.name,
    };
  }

  async login(email: string, password: string): Promise<ValidationResult<LoginResult>> {
    const user = await this.userRepository.getUser(email);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      this.logger.info(`Failed to login: ${email}`);

      return {
        success: false,
        error: {
          message: "Invalid credentials",
        },
      };
    }

    this.logger.info(`Login successful: ${email}`);

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
