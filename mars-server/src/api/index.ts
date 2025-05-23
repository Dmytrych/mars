import Fastify from 'fastify'
import auth from '@fastify/auth'
import {registerRoutes} from "./routes";
import {serializerCompiler, validatorCompiler, ZodTypeProvider} from "fastify-type-provider-zod";
import {diContainer, fastifyAwilixPlugin} from '@fastify/awilix'
import {AppConfig} from "../features/configuration";
import load from "./container";
import {tokenPlugin} from "../plugins/token-plugin";

export const initApi = async (config: AppConfig) => {
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

  await fastify.register(fastifyAwilixPlugin, {
    container: diContainer,
    disposeOnClose: true,
    asyncDispose: true,
    asyncInit: true,
    eagerInject: true,
    disposeOnResponse: false,
  })

  fastify.setValidatorCompiler(validatorCompiler);
  fastify.setSerializerCompiler(serializerCompiler);

  await fastify.register(auth)
  await fastify.register(tokenPlugin, {
    secret: config.api.auth.jwtSecret,
    expiresIn: config.api.auth.jwtLifespanSeconds,
  })

  fastify.diContainer.register(load(config, fastify.log))

  await fastify.register(registerRoutes, { prefix: '/v1' })

  try {
    await fastify.listen({ port: config.api.port })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
