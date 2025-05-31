import {z} from "zod";
import {getApiResponseSchema} from "../../../../../common/schemas/request";

export const getTrainerConnectionsSchema = {
  params: z.object({
    clientId: z.string(),
  }),
  response: {
    400: getApiResponseSchema(),
    200: getApiResponseSchema(),
  },
}

export type GetTrainerConnectionsSchemaType = typeof getTrainerConnectionsSchema
