import Fastify, { FastifyInstance } from 'fastify'
import initConfig from './plugin/config'
import fastifyMikro from './plugin/mikro'
import { UserRouter } from './service/user/'
import status from './service/status/routes'

export default class Server {
    public fastify: FastifyInstance

    public constructor() {
        this.fastify = Fastify({
            logger: {
                prettyPrint: {
                    translateTime: 'SYS:h:MM:ss TT Z o',
                    colorize: true,
                    ignore: 'pid,hostname',
                },
            },
        })

        initConfig(this.fastify)

        // Adding plugins
        this.fastify.register(fastifyMikro, { migrate: true })

        // Registering routes
        this.fastify.register(status)
        this.fastify.register(UserRouter.routes)
    }

    public async init(): Promise<void> {
        // wait for all plugins and initializers
        try {
            await this.fastify.ready()
        } catch (e) {
            this.fastify.log.error(`Unable to initialize plugins due to ${e}`)
        }

        this.fastify.listen(this.fastify.config.Port, '0.0.0.0', (err) => {
            if (err) {
                console.error(err)
                process.exit(1)
            }
        })
    }
}
