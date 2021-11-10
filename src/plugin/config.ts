import { FastifyInstance } from 'fastify'
import FastifyEnv from 'fastify-env'
import DotEnv from 'dotenv'

DotEnv.config()

const schema = {
    type: 'object',
    required: ['Port', 'Database', 'Environment'],
    properties: {
        Port: {
            type: 'string',
            default: 3015,
        },
        Database: {
            type: 'object',
            required: ['User', 'Password', 'Host', 'Port', 'Db'],
            properties: {
                User: {
                    type: 'string',
                    default: 'Truman',
                },
                Password: {
                    type: 'string',
                    default: 'Capote',
                },
                Host: {
                    type: 'string',
                    default: 'localhost',
                },
                Port: {
                    type: 'number',
                    default: 5432,
                },
                Db: {
                    type: 'string',
                    default: 'truman',
                },
            },
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
        Database: {
            User: process.env.POSTGRES_USER,
            Password: process.env.POSTGRES_PASSWORD,
            Host: process.env.DB_URL,
            Port: process.env.POSTGRES_PORT,
            Db: process.env.POSTGRES_DB_NAME,
        },
        Environment: process.env.ENVIRONMENT,
    },
}

declare module 'fastify' {
    interface FastifyInstance {
        config: {
            Port: string
            Database: {
                User: string
                Password: string
                Host: string
                Port: number
                Db: string
            }
            Environment: string
        }
    }
}

export default function initConfig(fastify: FastifyInstance): void {
    fastify.register(FastifyEnv, options)
}
