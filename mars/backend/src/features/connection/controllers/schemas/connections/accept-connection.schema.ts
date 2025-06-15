import {z} from "zod";
import {getApiResponseSchema} from "../../../../../common/schemas/request";
import {connectionSchema} from "./common";

export const acceptConnectionSchema = {
  params: z.object({
    id: z.string(),
  }),
  response: {
    400: getApiResponseSchema(),
    200: getApiResponseSchema(connectionSchema),
  },
}

export type AcceptConnectionSchemaType = typeof acceptConnectionSchema
