// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FastifyInstance, FastifyRequest } from 'fastify'
import { PaymentFactory } from '../service/payment/Factory'
import fp from 'fastify-plugin'
import { Stripe } from '../service/payment/stripe/Stripe'
import { Paypal } from '../service/payment/paypal/Paypal'

class Client {
    public static async init(fastify: FastifyInstance): Promise<void> {
        fastify.decorateRequest('Payment', null)
        fastify.addHook('preHandler', async (request: FastifyRequest) => {
            request.Payment = PaymentFactory.Payment(fastify.config.PaymentProvider)
        })
    }
}

declare module 'fastify' {
    export interface FastifyRequest {
        Payment: Stripe | Paypal
    }
}

export default fp(Client.init, { name: 'GBT' })
