import {z} from "zod";
import {getApiResponseSchema} from "../../../../../common/schemas/request";

export const rejectConnectionSchema = {
  params: z.object({
    id: z.string(),
  }),
  response: {
    400: getApiResponseSchema(),
    200: getApiResponseSchema(),
  },
}

export type RejectConnectionSchemaType = typeof rejectConnectionSchema
