import {
  createUserSchema, loginUserSchema
} from "./user.schema";
import {FastifyInstanceType, injectHandler} from "../../../api/types";
import {UserController} from "./user.controller";

export async function userRoutes(app: FastifyInstanceType) {

  app.post(
    '/register',
    {
      schema: createUserSchema,
    },
    injectHandler((diScope) => diScope.resolve<UserController>('userController').register)
  )
  app.post(
    '/login',
    {
      schema: loginUserSchema,
    },
    injectHandler((diScope) => diScope.resolve<UserController>('userController').login)
  )
  app.post(
    '/protected',
    {
      preHandler: app.auth([app.authenticate]),
    },
    async (req, reply) => {
      reply.status(201).send(req.user);
    },
  )
  app.delete('/logout', () => {})
}
