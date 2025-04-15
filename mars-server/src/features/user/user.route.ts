import {FastifyInstance, FastifyReply, FastifyRequest} from "fastify";
import {createUserResponseSchema, createUserSchema, loginResponseSchema, loginSchema} from "./user.schema";
import { register, login } from "./user.service";

export async function userRoutes(app: FastifyInstance) {
  app.get('/', (req: FastifyRequest, reply: FastifyReply) => {
    reply.send({ message: '/ route hit' })
  })
  app.post(
    '/register',
    {
      schema: {
        body: createUserSchema,
        response: {
          201: createUserResponseSchema,
        },
      },
    },
    async (req, reply) => {
      const { email, password, name } = req.body;
      const user = await register(email, password, name);
      reply.status(201).send(user);
    },
  )
  app.post(
    '/login',
    {
      schema: {
        body: loginSchema,
        response: {
          201: loginResponseSchema,
        },
      },
    },
    async (req, reply) => {
      const { email, password } = req.body;
      const token = await login(email, password);
      reply.status(201).send(token);
    },
  )
  app.delete('/logout', () => {})
}
