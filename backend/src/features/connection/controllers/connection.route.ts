import {FastifyInstanceType} from "../../../common/types/api";
import {injectionHandler} from "../../../common/container-utils";
import {asValue} from "awilix";
import {IUser} from "../../../common/types/types";
import {createConnectionRequestSchema} from "./schemas/connections/create-connection.schema";
import {ConnectionController} from "./connection.controller";

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
}
