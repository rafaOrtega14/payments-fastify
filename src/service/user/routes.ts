import { FastifyInstance, FastifyServerOptions } from 'fastify'
import { UserManager } from './manager/user'
import { User } from './entity/user'
import { Static, Type } from '@sinclair/typebox'
import { UserController } from './controller/user'

export class UserRouter {
    public static routes = async (fastify: FastifyInstance, options: FastifyServerOptions): Promise<void> => {
        const userRepo = fastify.orm.em.getRepository(User)
        const userManager = new UserManager(userRepo, fastify.log)
        fastify.decorateRequest('userManager', userManager)

        fastify.get('/user', UserController.listUser)

        fastify.post<{ Body: UserType; Response: UserType }>(
            '/user',
            {
                schema: {
                    body: UserBody,
                    response: {
                        200: User,
                    },
                },
            },
            async (request, reply) => {
                const { body: user, log } = request
                const userRepo = fastify.orm.em.getRepository(User)
                const userManager = new UserManager(userRepo, log)

                const message = await userManager.createUser(user.name)
                reply.status(200).send(message)
            },
        )
    }
}

declare module 'fastify' {
    export interface FastifyRequest {
        userManager: UserManager
    }
}

const UserBody = Type.Object({
    name: Type.String(),
    mail: Type.Optional(Type.String({ format: 'email' })),
})

type UserType = Static<typeof UserBody>
