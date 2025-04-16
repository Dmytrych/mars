import Fastify from 'fastify'
import {configDotenv} from "dotenv";
import {loadConfig} from "../features/configuration";
import auth from '@fastify/auth'
import {registerRoutes} from "./routes";
import {serializerCompiler, validatorCompiler, ZodTypeProvider} from "fastify-type-provider-zod";
import {fastifyAwilixPlugin} from '@fastify/awilix'

export const initApi = async () => {
  configDotenv()
  const config = loadConfig()
  const fastify = Fastify({
    logger: {
      transport: {
        target: 'pino-pretty',
        options: {
          translateTime: 'HH:MM:ss Z',
          ignore: 'pid,hostname',
        },
      },
    }
  }).withTypeProvider<ZodTypeProvider>();

  fastify.setValidatorCompiler(validatorCompiler);
  fastify.setSerializerCompiler(serializerCompiler);

  fastify.decorate('config', config)

  fastify.register(fastifyAwilixPlugin, { disposeOnClose: true, disposeOnResponse: true })
  fastify.register(auth)

  fastify.register(registerRoutes, { prefix: '/v1' })

  try {
    await fastify.listen({ port: config.api.port })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
