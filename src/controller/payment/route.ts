import { FastifyInstance } from 'fastify'
import { PaymentController } from '.'

export class PokemonRouter {
    public static routes = async (fastify: FastifyInstance): Promise<void> => {
        fastify.get('/payment/pay', PaymentController.pay)
        fastify.get('/payment/reimburse', PaymentController.reimburse)
        fastify.get('/payment/reimburse/partial', PaymentController.partialReimburse)
    }
}
