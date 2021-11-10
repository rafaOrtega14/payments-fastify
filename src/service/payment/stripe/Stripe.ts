import { GenericPayment } from '../GenericPayment'

export class Stripe extends GenericPayment {
    public accountQuantity(account: number, amount: number): number {
        return (account - amount) * 0.8
    }
    public clientProviderId(): string {
        return '58f56171ee9d4bd5e610d661'
    }
}
