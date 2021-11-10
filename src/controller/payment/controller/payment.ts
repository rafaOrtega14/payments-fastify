import { FastifyReply, FastifyRequest } from 'fastify'
import { Paypal } from '../../../service/payment/paypal/Paypal'

export class PaymentController {
    public static pay = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
        reply.status(200).send(request.Payment.pay(300, 50))
    }
    public static reimburse = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
        reply.status(200).send(request.Payment.reimburse())
    }
    public static partialReimburse = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
        const payment = request.Payment as Paypal
        reply.status(200).send(payment.partialReimburse())
    }
}
