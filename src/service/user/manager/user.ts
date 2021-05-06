import { EntityRepository } from '@mikro-orm/core'
import { FastifyLoggerInstance } from 'fastify'

// Database Entities
import { User } from '../entity/user'

export class UserManager {
    public constructor(private userRepository: EntityRepository<User>, private logger: FastifyLoggerInstance) {}

    public listUser = async (): Promise<User[] | void> => {
        try {
            const users = await this.userRepository.findAll()
            return users
        } catch (error) {
            this.logger.error(`Unable to list users: ${error}`)
        }
    }

    public createUser = async (name: string): Promise<{ message: string }> => {
        try {
            await this.userRepository.persistAndFlush(new User(name))
            return { message: 'saved' }
        } catch (error) {
            this.logger.error(`Unable to create user: ${error}`)
            throw error
        }
    }

    public getByID = async (userID: number): Promise<User | void | null> => {
        try {
            const user = await this.userRepository.findOne({ id: userID })
            return user
        } catch {
            this.logger.warn(`Unable to find user with ID: ${userID}`)
        }
    }
}
