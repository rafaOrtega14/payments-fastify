import { GenericPayment } from '../GenericPayment'

export class Paypal extends GenericPayment {
    public clientProviderId(): string {
        return '58f56171ee9d4bd5e610d64e'
    }
    public accountQuantity(account: number, amount: number): number {
        return account - amount
    }
    public partialReimburse(): string {
        return 'Partial reimburse has been made'
    }
}
