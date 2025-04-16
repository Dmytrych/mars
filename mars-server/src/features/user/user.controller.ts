import {createUserResponseSchema, createUserSchema, loginResponseSchema, loginSchema} from "./user.schema";
import {FastifyServer} from "../../api/types";
import {getApiResponseSchema} from "../../common/schemas";
import {getSuccessResponse} from "../../common/response-helpers";
import {toApiResponse} from "../../common/validation-result";
import {IUserService} from "./user.service";
import {load} from "./user.container";

export async function userRoutes(app: FastifyServer) {
  app.diContainer.register(load())

  app.post(
    '/register',
    {
      schema: {
        body: createUserSchema,
        response: {
          201: getApiResponseSchema(createUserResponseSchema),
        },
      },
    },
    async (req, reply) => {
      const { email, password, name } = req.body;
      const userService = req.diScope.resolve<IUserService>('userService')
      const user = await userService.register(email, password, name);

      reply.status(201).send(getSuccessResponse(user));
    },
  )
  app.post(
    '/login',
    {
      schema: {
        body: loginSchema,
        response: {
          401: getApiResponseSchema(),
          201: getApiResponseSchema(loginResponseSchema),
        },
      },
    },
    async (req, reply) => {
      const { email, password } = req.body;
      const userService = req.diScope.resolve<IUserService>('userService')
      const result = await userService.login(email, password);

      if (!result.success) {
        reply.status(401).send(toApiResponse(result)); // Send error response
        return;
      }

      reply.status(201).send(toApiResponse(result));
    },
  )
  app.delete('/logout', () => {})
}
