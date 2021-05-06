import fp from 'fastify-plugin'
import { FastifyInstance } from 'fastify'
import { MikroORM, Options, Configuration } from '@mikro-orm/core'

type fastifyMikroOptions = {
    migrate?: boolean
} & (Options | Configuration)

const fastifyMikro = async (fastify: FastifyInstance, options: fastifyMikroOptions) => {
    const orm = await MikroORM.init({
        entities: ['build/service/**/entity/*.js'],
        entitiesTs: ['src/service/**/entity/*.ts'],
        debug: true,
        migrations: {
            // TODO: Add files in services dinamically
            path: 'src/service/user/migration/',
            tableName: 'migrationsHistory',
            transactional: true,
        },
        dbName: fastify.config.Database.Db,
        type: 'postgresql', // one of `mongo` | `mysql` | `mariadb` | `postgresql` | `sqlite`
        host: fastify.config.Database.Host,
        password: fastify.config.Database.Password,
        port: fastify.config.Database.Port,
        user: fastify.config.Database.User,
        tsNode: true,
    })

    fastify.addHook('onClose', (fastify) => fastify.orm.close(true))
    fastify.decorateRequest('orm', orm)

    if (options.migrate) {
        await orm.getMigrator().up()
    }

    fastify.orm = orm
}

declare module 'fastify' {
    export interface FastifyInstance {
        orm: MikroORM
    }

    export interface FastifyRequest {
        orm: MikroORM
    }
}

export default fp(fastifyMikro, { name: 'fastify-mikro' })
