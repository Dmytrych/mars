import {z} from "zod";
import {getApiResponseSchema} from "../../../../../common/schemas/request";

export const getClientConnectionsSchema = {
  params: z.object({
    clientId: z.string(),
  }),
  response: {
    400: getApiResponseSchema(),
    200: getApiResponseSchema(),
  },
}

export type GetClientConnectionsSchemaType = typeof getClientConnectionsSchema
