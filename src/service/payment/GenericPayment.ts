export abstract class GenericPayment {
    public pay(account: number, amount: number): string {
        const accountQuantity = this.accountQuantity(account, amount)
        return `Payment made now the account has: ${accountQuantity}$`
    }
    public reimburse(): string {
        const client = this.clientProviderId()
        return `Money resent to: ${client}`
    }
    public abstract clientProviderId(): string
    public abstract accountQuantity(account: number, amount: number): number
}
