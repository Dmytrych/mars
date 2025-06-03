import {FastifyValidatedHandler} from "../../../common/types/api";
import {getSuccessResponse} from "../../../common/response-helpers";
import {CreateConnectionSchemaType} from "./schemas/connections/create-connection.schema";
import {DeleteConnectionSchemaType} from "./schemas/connections/delete-connection.schema";
import {AcceptConnectionSchemaType} from "./schemas/connections/accept-connection.schema";
import {RejectConnectionSchemaType} from "./schemas/connections/reject-connection.schema";
import {GetClientConnectionsSchemaType} from "./schemas/connections/get-client-connections.schema";
import {GetTrainerConnectionsSchemaType} from "./schemas/connections/get-trainer-connections.schema";
import {IConnectionService} from "../services/connection.service";
import {IUser} from "../../../common/types/types";

interface IConnectionControllerDependencies {
  connectionService: IConnectionService
  user: IUser
}

export class ConnectionController {
  private readonly connectionService: IConnectionService;
  private readonly user: IUser;

  constructor(dependencies: IConnectionControllerDependencies) {
    this.connectionService = dependencies.connectionService;
    this.user = dependencies.user;
  }

  create: FastifyValidatedHandler<CreateConnectionSchemaType> = async (request, reply) => {
    const createdConnection = await this.connectionService.add({
      trainerId: request.body.trainerId,
      clientId: this.user.id
    })
    reply.status(200).send(getSuccessResponse(createdConnection));
  }

  delete: FastifyValidatedHandler<DeleteConnectionSchemaType> = async (request, reply) => {
    const deletionSuccessful = await this.connectionService.delete(request.params.id);

    reply.status(200).send({
      success: deletionSuccessful
    });
  }

  accept: FastifyValidatedHandler<AcceptConnectionSchemaType> = async (request, reply) => {
    const updatedModel = await this.connectionService.accept(request.params.id);

    reply.status(200).send(getSuccessResponse(updatedModel));
  }

  reject: FastifyValidatedHandler<RejectConnectionSchemaType> = async (request, reply) => {
    const updatedModel = await this.connectionService.reject(request.params.id);

    reply.status(200).send(getSuccessResponse(updatedModel));
  }

  getClientConnections: FastifyValidatedHandler<GetClientConnectionsSchemaType> = async (request, reply) => {
    const updatedModel = await this.connectionService.getClientConnections(this.user.id);

    reply.status(200).send(getSuccessResponse(updatedModel));
  }

  getTrainerConnections: FastifyValidatedHandler<GetTrainerConnectionsSchemaType> = async (request, reply) => {
    const updatedModel = await this.connectionService.getTrainerConnections(this.user.id);

    reply.status(200).send(getSuccessResponse(updatedModel));
  }
}
