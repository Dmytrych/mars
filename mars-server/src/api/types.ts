import {FastifyBaseLogger, FastifyInstance, FastifyReply, FastifyRequest} from "fastify";
import {IncomingMessage, Server, ServerResponse} from "node:http";
import {ZodTypeProvider} from "fastify-type-provider-zod";
import {RouteGenericInterface} from "fastify/types/route";
import {FastifySchema} from "fastify/types/schema";
import {ContextConfigDefault} from "fastify/types/utils";
import {AwilixContainer} from "awilix";

type ServerType = Server<any, any>

export type FastifyInstanceType = FastifyInstance<ServerType, IncomingMessage, ServerResponse, FastifyBaseLogger, ZodTypeProvider>

export type FastifyValidatedRequest<TSchema extends FastifySchema> = FastifyRequest<RouteGenericInterface, ServerType, IncomingMessage, TSchema, ZodTypeProvider>

export type FastifyValidatedReply<TSchema extends FastifySchema> = FastifyReply<RouteGenericInterface, ServerType, IncomingMessage, ServerResponse, ContextConfigDefault, TSchema, ZodTypeProvider>

export type FastifyValidatedHandler<TSchema extends FastifySchema> = (request: FastifyValidatedRequest<TSchema>, reply: FastifyValidatedReply<TSchema>) => void | Promise<void>

type InjectionCB<TSchema extends FastifySchema> = (container: AwilixContainer) => FastifyValidatedHandler<TSchema>

export const injectHandler = <TSchema extends FastifySchema>(injectionCb: InjectionCB<TSchema>): FastifyValidatedHandler<TSchema> => {
  return (request, reply) => {
    const handler = (injectionCb(request.diScope))
    return handler(request, reply)
  }
}
