import { FastifyInstance } from 'fastify'
import { Static, Type } from '@sinclair/typebox'
import { UserManager, User, UserController } from './'

export class UserRouter {
    public static routes = async (fastify: FastifyInstance): Promise<void> => {
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
            UserController.createUser,
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
