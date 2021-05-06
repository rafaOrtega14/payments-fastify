import { FastifyInstance } from 'fastify'
import { UserManager, User, UserController, UserType, UserBody } from './'

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
                        200: UserBody,
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
