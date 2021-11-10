import { FastifyInstance } from 'fastify'
import FastifyEnv from 'fastify-env'
import DotEnv from 'dotenv'

DotEnv.config()

const schema = {
    type: 'object',
    required: ['Port', 'Environment'],
    properties: {
        Port: {
            type: 'string',
            default: 3015,
        },
        PaymentProvider: {
            type: 'string',
            default: 'paypal',
        },
        Environment: {
            type: 'string',
            default: 'development',
        },
    },
}

const options = {
    confKey: 'config',
    schema: schema,
    data: {
        Port: process.env.PORT,
        PaymentProvider: process.env.PAYMENT,
        Environment: process.env.ENVIRONMENT,
    },
}

declare module 'fastify' {
    interface FastifyInstance {
        config: {
            Port: string
            PaymentProvider: string
            Environment: string
        }
    }
}

export default function initConfig(fastify: FastifyInstance): void {
    fastify.register(FastifyEnv, options)
}
