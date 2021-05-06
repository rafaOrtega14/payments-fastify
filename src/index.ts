import Fastify from 'fastify'
import status from './service/status/routes'
import { UserRouter } from './service/user/routes'
import initConfig from './plugin/config'
import fastifyMikro from './plugin/mikro'

const fastify = Fastify({
    logger: {
        prettyPrint: {
            translateTime: 'SYS:h:MM:ss TT Z o',
            colorize: true,
            ignore: 'pid,hostname',
        },
    },
})
/* const User = Type.Object({
    name: Type.String(),
    password: Type.Optional(Type.String({ format: 'email' })),
}) */

initConfig(fastify)

// Adding plugins
fastify.register(fastifyMikro, { migrate: true })

// Registering routes
fastify.register(status)
fastify.register(UserRouter.routes)

/* fastify.get<{
    Querystring: UserType
    Headers: IHeaders
}>(
    '/auth',
    {
        schema: {
            querystring: User,
        },
        preValidation: (request, reply, done) => {
            const { name, password } = request.query
            done(name !== 'admin' ? new Error('Must be admin') : undefined) // only validate `admin` account
        },
    },
    async (request, reply) => {
        const customerHeader = request.headers['h-Custom']
        // do something with request data
        return `logged in!`
    },
)

fastify.post<{ Body: UserType; Response: UserType }>(
    '/',
    {
        schema: {
            body: User,
            response: {
                200: User,
            },
        },
    },
    (req, rep) => {
        const { body: user } = req

        //...
        rep.status(200).send(user)
    },
) */

fastify.ready(async (err: Error) => {
    if (err) {
        fastify.log.error(`Unable to initialize plugins due to ${err}`)
    }

    fastify.listen(fastify.config.Port, '0.0.0.0', (err, address) => {
        if (err) {
            console.error(err)
            process.exit(1)
        }
    })
})

/* interface IQuerystring {
    username: string
    password: string
}

interface IHeaders {
    'h-Custom': string
}
type UserType = Static<typeof User> */
