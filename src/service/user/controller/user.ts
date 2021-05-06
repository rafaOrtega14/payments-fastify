import { FastifyReply, FastifyRequest } from 'fastify'

export class UserController {
    public static listUser = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
        const userList = await request.userManager.listUser()
        reply.send(userList)
    }

    public static createUser = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
        const { body: user } = request
        const userTyped = user as UserData

        const message = await request.userManager.createUser(userTyped.name)
        reply.status(200).send(message)
    }
}

interface UserData {
    name: string
    email: string
}
