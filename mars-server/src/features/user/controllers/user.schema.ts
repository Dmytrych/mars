import {z} from "zod";
import {getApiResponseSchema} from "../../../common/schemas/request";

export const createUserBodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string(),
})

export const createUserResponseSchema = z.object({
  id: z.number(),
  email: z.string(),
  name: z.string(),
})

export const createUserSchema = {
  body: createUserBodySchema,
  response: {
    201: getApiResponseSchema(createUserResponseSchema)
  }
}

export type CreateUserSchemaType = typeof createUserSchema

export const loginSchema = z.object({
  email: z
    .string({
      required_error: 'Email is required',
      invalid_type_error: 'Email must be a string',
    })
    .email(),
  password: z.string().min(6),
})

export const loginResponseSchema = z.object({
  accessToken: z.string(),
  user: z.object({
    id: z.string(),
    email: z.string(),
    name: z.string(),
  })
})

export const loginUserSchema = {
    body: loginSchema,
    response: {
      401: getApiResponseSchema(),
      201: getApiResponseSchema(loginResponseSchema),
    },
  }

export type LoginUserSchemaType = typeof loginUserSchema


export type CreateUserInput = z.infer<typeof createUserBodySchema>
export type LoginUserInput = z.infer<typeof loginSchema>
