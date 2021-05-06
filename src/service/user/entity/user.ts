// Packages
import { Entity, PrimaryKey, Property } from '@mikro-orm/core'

@Entity()
export class User {
    @PrimaryKey()
    public id!: number

    @Property()
    public name: string

    public constructor(name: string) {
        this.name = name
    }
}
