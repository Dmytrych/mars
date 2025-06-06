import {z} from "zod";

const configSchema = z.object({
  amqp: z.object({
    host: z.string(),
    username: z.string(),
    password: z.string(),
  })
})

export type AppConfig = z.infer<typeof configSchema>

export function loadConfig(): AppConfig {
  return configSchema.parse({
    amqp: {
      host: process.env.AMQP_HOST,
      username: process.env.AMQP_USER,
      password: process.env.AMQP_PASSWORD,
    }
  })
}
