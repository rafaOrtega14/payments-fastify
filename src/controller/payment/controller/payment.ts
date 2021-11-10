import { FastifyReply, FastifyRequest } from 'fastify'
import { PaymentFactory } from '../../../service/payment/Factory'
import { Paypal } from '../../../service/payment/paypal/Paypal'

export class PaymentController {
    public static pay = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
        const payment = PaymentFactory.Payment('stripe')
        reply.status(200).send(payment.pay(300, 50))
    }
    public static reimburse = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
        const payment = PaymentFactory.Payment('paypal')
        reply.status(200).send(payment.reimburse())
    }
    public static partialReimburse = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
        const payment = PaymentFactory.Payment('paypal') as Paypal
        reply.status(200).send(payment.partialReimburse())
    }
}
