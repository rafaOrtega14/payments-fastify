import Fastify, { FastifyInstance } from 'fastify'
import mongoose from 'fastify-mongodb'
import initConfig from './plugin/config'
import { PingRouter } from './controller/status'
import { PokemonRouter } from './controller/payment'

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
        this._fastify.register(mongoose, {
            forceClose: true,
            url: 'mongodb+srv://testUser:testUser123@cluster0.repty.mongodb.net/pokemonsample',
        })
        // Registering routes
        this._fastify.register(PingRouter.routes)
        this._fastify.register(PokemonRouter.routes)
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
