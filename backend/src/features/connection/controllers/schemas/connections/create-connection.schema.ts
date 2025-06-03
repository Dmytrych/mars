import {z} from "zod";
import {getApiResponseSchema} from "../../../../../common/schemas/request";
import {connectionSchema, connectionStatusSchema} from "./common";

const createConnectionBodySchema = z.object({
  trainerId: z.string(),
})

export const createConnectionRequestSchema = {
  body: createConnectionBodySchema,
  response: {
    200: getApiResponseSchema(connectionSchema),
  },
}

export type CreateConnectionSchemaType = typeof createConnectionRequestSchema
