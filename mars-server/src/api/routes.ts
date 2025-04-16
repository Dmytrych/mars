import {FastifyInstance} from "fastify";
import {healthcheckRoutes} from "../features/healthcheck/healthcheck.route";
import {userRoutes} from "../features/user/user.controller";

export const registerRoutes = (fastify: FastifyInstance) => {
  fastify.register(healthcheckRoutes, { prefix: '/healthcheck' })
  fastify.register(userRoutes, { prefix: '/user' })
}
