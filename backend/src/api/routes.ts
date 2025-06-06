import {FastifyInstance} from "fastify";
import {healthcheckRoutes} from "../features/healthcheck/healthcheck.route";
import {authRoutes} from "../features/auth/controllers/auth.route";
import {connectionRoutes} from "../features/connection/controllers/connection.route";
import {redocRoutes} from "../features/openapi/controllers/openapi.route";
import {AppConfig} from "../common/configuration";

export const registerRoutes = (fastify: FastifyInstance) => {
  const config = fastify.diContainer.resolve<AppConfig>('appConfig')

  fastify.register(healthcheckRoutes, { prefix: '/healthcheck' })
  fastify.register(authRoutes, { prefix: '/auth' })
  fastify.register(connectionRoutes, { prefix: '/connections' })

  if (config.nodeEnv === 'development') {
    fastify.register(redocRoutes, { prefix: '/redoc' })
  }
}
