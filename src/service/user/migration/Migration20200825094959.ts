import { Migration } from '@mikro-orm/migrations'

export class Migration20200825094959 extends Migration {
    public async up(): Promise<void> {
        this.addSql(`
            create table "user" (
                "id" SERIAL PRIMARY KEY, 
                "name" TEXT NOT NULL
            );`)
    }

    public async down(): Promise<void> {
        this.addSql('drop table "user";')
    }
}
