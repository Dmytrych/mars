import {z} from "zod";
import {getApiResponseSchema} from "../../../../../common/schemas/request";

export const deleteConnectionSchema = {
  params: z.object({
    id: z.string(),
  }),
  response: {
    400: getApiResponseSchema(),
    200: getApiResponseSchema(),
  },
}

export type DeleteConnectionSchemaType = typeof deleteConnectionSchema
