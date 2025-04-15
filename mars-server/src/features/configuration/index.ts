import { z } from "zod";

const configSchema = z.object({
  api: z.object({
    port: z.number(),
    auth: z.object({
      apiKey: z.string()
    })
  }),
  db: z.object({
    connectionString: z.string(),
    host: z.string(),
    port: z.coerce.number(),
    user: z.string(),
    database: z.string(),
    password: z.string(),
    ssl: z.coerce.boolean()
  })
});

export type AppConfig = z.infer<typeof configSchema>;

export function loadConfig(): AppConfig {
  try {
    const config: AppConfig = {
      api: {
        port: z.coerce.number().parse(process.env.PORT),
        auth: {
          apiKey: z.coerce.string().parse(process.env.AUTH_APIKEY)
        }
      },
      db: {
        connectionString: z.coerce.string().parse(process.env.DATABASE_URL),
        host: z.coerce.string().parse(process.env.DB_HOST),
        port: z.coerce.number().parse(process.env.DB_PORT),
        user: z.coerce.string().parse(process.env.DB_USER),
        database: z.coerce.string().parse(process.env.DB_NAME),
        password: z.coerce.string().parse(process.env.DB_PASSWORD),
        ssl: z.coerce.boolean().parse(process.env.DB_SSL)
      }
    };

    return configSchema.parse(config);
  } catch (err) {
    console.error(err);
    throw err;
  }
}
