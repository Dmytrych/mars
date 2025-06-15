import {z} from "zod";
import {getApiResponseSchema} from "../../../../../common/schemas/request";
import {connectionSchema} from "./common";

const getTrainerConnectionsResponseSchema = z.array(connectionSchema)

export const getTrainerConnectionsSchema = {
  response: {
    400: getApiResponseSchema(),
    200: getApiResponseSchema(getTrainerConnectionsResponseSchema),
  },
}

export type GetTrainerConnectionsSchemaType = typeof getTrainerConnectionsSchema
