import {FastifyValidatedHandler} from "../../../common/types/api";
import {getSuccessResponse} from "../../../common/response-helpers";
import {CreateConnectionSchemaType} from "./schemas/connections/create-connection.schema";
import {DeleteConnectionSchemaType} from "./schemas/connections/delete-connection.schema";
import {AcceptConnectionSchemaType} from "./schemas/connections/accept-connection.schema";
import {RejectConnectionSchemaType} from "./schemas/connections/reject-connection.schema";
import {GetClientConnectionsSchemaType} from "./schemas/connections/get-client-connections.schema";
import {GetTrainerConnectionsSchemaType} from "./schemas/connections/get-trainer-connections.schema";

interface IConnectionControllerDependencies {

}

export class ConnectionController {

  constructor(dependencies: IConnectionControllerDependencies) {

  }

  create: FastifyValidatedHandler<CreateConnectionSchemaType> = async (request, reply) => {

    reply.status(200).send(getSuccessResponse());
  }

  delete: FastifyValidatedHandler<DeleteConnectionSchemaType> = async (request, reply) => {

    reply.status(200).send(getSuccessResponse());
  }

  accept: FastifyValidatedHandler<AcceptConnectionSchemaType> = async (request, reply) => {

    reply.status(200).send(getSuccessResponse());
  }

  reject: FastifyValidatedHandler<RejectConnectionSchemaType> = async (request, reply) => {

    reply.status(200).send(getSuccessResponse());
  }

  getClientConnections: FastifyValidatedHandler<GetClientConnectionsSchemaType> = async (request, reply) => {

    reply.status(200).send(getSuccessResponse());
  }

  getTrainerConnections: FastifyValidatedHandler<GetTrainerConnectionsSchemaType> = async (request, reply) => {

    reply.status(200).send(getSuccessResponse());
  }
}
