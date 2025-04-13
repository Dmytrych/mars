import Fastify from 'fastify'

export const initApi = async () => {
  const fastify = Fastify({
    logger: true
  })

  fastify.get('/', async function handler (request, reply) {
    return { hello: 'world' }
  })

  try {
    await fastify.listen({ port: 3000 })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
