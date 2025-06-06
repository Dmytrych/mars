import { z } from "zod";

export const configSchema = z.object({
  nodeEnv: z.enum(["development", "production"]),
  api: z.object({
    port: z.number(),
    host: z.string(),
    auth: z.object({
      jwtSecret: z.string(),
      jwtLifespanSeconds: z.number()
    }),
    cors: z.object({
      origin: z.string(),
    }),
  }),
  amqp: z.object({
    host: z.string(),
    username: z.string(),
    password: z.string()
  }),
  db: z.object({
    connectionString: z.string().optional(),
    host: z.string().optional(),
    port: z.coerce.number().optional(),
    user: z.string().optional(),
    database: z.string().optional(),
    password: z.string().optional(),
    ssl: z.coerce.boolean().optional()
  })
});

export type AppConfig = z.infer<typeof configSchema>;
