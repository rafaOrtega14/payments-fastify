import Fastify, { FastifyInstance } from 'fastify'
import initConfig from './plugin/config'
import fastifyMikro from './plugin/mikro'
import { UserRouter } from './service/user/'
import status from './service/status/routes'

export default class Server {
    private _fastify: FastifyInstance

    public constructor() {
        this._fastify = Fastify({
            logger: {
                prettyPrint: {
                    translateTime: 'SYS:h:MM:ss TT Z o',
                    colorize: true,
                    ignore: 'pid,hostname',
                },
            },
        })

        initConfig(this._fastify)

        // Adding plugins
        this._fastify.register(fastifyMikro, { migrate: true })

        // Registering routes
        this._fastify.register(status)
        this._fastify.register(UserRouter.routes)
    }

    public get fastify(): FastifyInstance {
        return this._fastify
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
