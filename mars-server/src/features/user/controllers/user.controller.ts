import {FastifyValidatedHandler} from "../../../api/types";
import {CreateUserSchemaType, LoginUserSchemaType} from "./user.schema";
import {IUserService} from "../services/user.service";
import {getSuccessResponse} from "../../../common/response-helpers";
import {toApiResponse} from "../../../common/validation-result";

type UserControllerDependencies = {
  userService: IUserService
}

export class UserController {
  private readonly userService: IUserService

  constructor(dependencies: UserControllerDependencies) {
    this.userService = dependencies.userService
  }

  register: FastifyValidatedHandler<CreateUserSchemaType> = async (request, reply) => {
    const { email, password, name } = request.body;
    const user = await this.userService.register(email, password, name);

    reply.status(201).send(getSuccessResponse(user));
  }

  login: FastifyValidatedHandler<LoginUserSchemaType> = async (request, reply) => {
    const { email, password } = request.body;
    const result = await this.userService.login(email, password);

    if (!result.success) {
      reply.status(401).send(toApiResponse(result));
      return;
    }

    reply.status(201).send(toApiResponse(result));
  }
}
