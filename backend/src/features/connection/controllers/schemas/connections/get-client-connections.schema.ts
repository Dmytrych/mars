import {getApiResponseSchema} from "../../../../../common/schemas/request";
import {connectionSchema} from "./common";
import {z} from "zod";

const getClientConnectionsResponseSchema = z.array(connectionSchema)

export const getClientConnectionsSchema = {
  response: {
    400: getApiResponseSchema(),
    200: getApiResponseSchema(getClientConnectionsResponseSchema),
  },
}

export type GetClientConnectionsSchemaType = typeof getClientConnectionsSchema
