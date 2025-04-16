import {FastifyBaseLogger, FastifyInstance} from "fastify";
import {IncomingMessage, Server, ServerResponse} from "node:http";
import {ZodTypeProvider} from "fastify-type-provider-zod";

export type FastifyServer = FastifyInstance<Server<any, any>, IncomingMessage, ServerResponse<IncomingMessage>, FastifyBaseLogger, ZodTypeProvider>
