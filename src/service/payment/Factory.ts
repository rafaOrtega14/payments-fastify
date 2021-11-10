import { Stripe } from './stripe/Stripe'
import { Paypal } from './paypal/Paypal'
export class PaymentFactory {
    public static Payment(provider: string): Stripe | Paypal {
        switch (provider) {
            case 'stripe':
                return new Stripe()
            case 'paypal':
                return new Paypal()
            default:
                throw new Error('Unknown Provider pls try again')
        }
    }
}
