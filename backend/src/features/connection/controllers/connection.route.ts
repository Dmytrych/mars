import {FastifyInstanceType} from "../../../common/types/api";
import {injectionHandler} from "../../../common/utils/container-utils";
import {asValue} from "awilix";
import {IUser} from "../../../common/types/types";
import {createConnectionRequestSchema} from "./schemas/connections/create-connection.schema";
import {ConnectionController} from "./connection.controller";
import {deleteConnectionSchema} from "./schemas/connections/delete-connection.schema";
import {acceptConnectionSchema} from "./schemas/connections/accept-connection.schema";
import {getTrainerConnectionsSchema} from "./schemas/connections/get-trainer-connections.schema";
import {getClientConnectionsSchema} from "./schemas/connections/get-client-connections.schema";
import {rejectConnectionSchema} from "./schemas/connections/reject-connection.schema";

export async function connectionRoutes(app: FastifyInstanceType) {
  app.addHook('preHandler', app.auth([
    app.auth([app.authenticate])
  ]))

  app.addHook('preHandler', (req, res, done) => {
    req.diScope.register('user', asValue(req.user as IUser));
    done()
  })

  app.post(
    '/',
    {
      schema: createConnectionRequestSchema,
    },
    injectionHandler(
      (diScope) => diScope.resolve<ConnectionController>('connectionController').create
    )
  )
  app.delete(
    '/:id',
    {
      schema: deleteConnectionSchema,
    },
    injectionHandler(
      (diScope) => diScope.resolve<ConnectionController>('connectionController').delete
    )
  )
  app.post(
    '/:id/accept',
    {
      schema: acceptConnectionSchema,
    },
    injectionHandler(
      (diScope) => diScope.resolve<ConnectionController>('connectionController').accept
    )
  )
  app.post(
    '/:id/reject',
    {
      schema: rejectConnectionSchema,
    },
    injectionHandler(
      (diScope) => diScope.resolve<ConnectionController>('connectionController').reject
    )
  )
  app.get(
    '/client',
    {
      schema: getClientConnectionsSchema,
    },
    injectionHandler(
      (diScope) => diScope.resolve<ConnectionController>('connectionController').getClientConnections
    )
  )
  app.get(
    '/trainer',
    {
      schema: getTrainerConnectionsSchema,
    },
    injectionHandler(
      (diScope) => diScope.resolve<ConnectionController>('connectionController').getTrainerConnections
    )
  )
}
