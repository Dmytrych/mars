import {UserRepository} from "./repositories/user.repository";
import {asClass} from "awilix";
import {UserService} from "./services/user.service";
import {UserController} from "./controllers/user.controller";

export const load = () => {
  return {
    userRepository: asClass(UserRepository),
    userService: asClass(UserService),
    userController: asClass(UserController)
  }
}
