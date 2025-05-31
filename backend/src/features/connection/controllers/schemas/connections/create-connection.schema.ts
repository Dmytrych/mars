import {z} from "zod";
import {getApiResponseSchema} from "../../../../../common/schemas/request";
import {connectionSchema, connectionStatusSchema} from "./common";

const createConnectionBodySchema = z.object({
  trainerId: z.string(),
  status: connectionStatusSchema,
  createdAt: z.string().datetime(),
})

export const createConnectionRequestSchema = {
  body: createConnectionBodySchema,
  response: {
    400: getApiResponseSchema(),
    200: getApiResponseSchema(connectionSchema),
  },
}

export type CreateConnectionSchemaType = typeof createConnectionRequestSchema
