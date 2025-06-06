import {FastifyInstanceType} from "../../../common/types/api";
import * as fs from "node:fs/promises";

export async function redocRoutes(app: FastifyInstanceType) {
  app.get(
    '/',
    async (request, reply) => {
      reply
        .type('text/html')
        .send(await fs.readFile('./public/redoc.html', 'utf8'))
    }
  )
  app.get(
    '/openapi.yaml',
    async (request, reply) => {
      reply
        .type('text/yaml')
        .send(app.swagger({ yaml: true }))
    }
  )
}
