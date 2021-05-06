import { FastifyReply, FastifyRequest } from 'fastify'

export class UserController {
    public static listUser = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
        const userList = await request.userManager.listUser()
        reply.send(userList)
    }
}
