import {UserRepository} from "./user.repository";
import {asClass} from "awilix";
import {UserService} from "./user.service";

export const load = () => {
  return {
    userRepository: asClass(UserRepository),
    userService: asClass(UserService),
  }
}
