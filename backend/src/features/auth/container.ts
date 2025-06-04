import {UserRepository} from "./repositories/user.repository";
import {asClass} from "awilix";
import {AuthService} from "./services/auth.service";
import {AuthController} from "./controllers/auth.controller";

export const load = () => {
  return {
    userRepository: asClass(UserRepository),
    authService: asClass(AuthService),
    authController: asClass(AuthController)
  }
}
