import { FastifyInstance } from 'fastify'
import { StatusController } from './'

export class PingRouter {
    public static routes = async (fastify: FastifyInstance): Promise<void> => {
        fastify.get('/ping', StatusController.ping)
    }
}
