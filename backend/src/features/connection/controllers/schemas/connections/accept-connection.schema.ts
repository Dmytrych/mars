import {z} from "zod";
import {getApiResponseSchema} from "../../../../../common/schemas/request";

export const acceptConnectionSchema = {
  params: z.object({
    id: z.string(),
  }),
  response: {
    400: getApiResponseSchema(),
    200: getApiResponseSchema(),
  },
}

export type AcceptConnectionSchemaType = typeof acceptConnectionSchema
