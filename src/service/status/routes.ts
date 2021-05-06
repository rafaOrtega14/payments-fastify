import fastify, { FastifyInstance, FastifyReply, FastifyRequest, FastifyServerOptions } from 'fastify'

export default async function routes(server: FastifyInstance, options: FastifyServerOptions): Promise<void> {
    server.get('/ping', async (request: FastifyRequest, reply: FastifyReply) => {
        server.log.info('Tha logger')
        reply.status(200).send('pong')
    })
}
