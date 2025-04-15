import {FastifyInstance} from "fastify";
import {healthcheckRoutes} from "../features/healthcheck/healthcheck.route";

export const registerRoutes = (fastify: FastifyInstance) => {
  fastify.register(healthcheckRoutes, { prefix: '/healthcheck' })
}
