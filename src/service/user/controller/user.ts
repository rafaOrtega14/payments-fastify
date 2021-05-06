import { FastifyReply, FastifyRequest } from 'fastify'
import { UserType } from '../'

export class UserController {
    public static listUser = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
        const userList = await request.userManager.listUser()
        reply.send(userList)
    }

    public static createUser = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
        const { body: user } = request
        const userTyped = user as UserType
        request.userManager.createUser(userTyped.name)
        reply.status(200).send(user)
    }
}
