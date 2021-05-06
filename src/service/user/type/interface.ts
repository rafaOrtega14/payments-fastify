import { Static, Type } from '@sinclair/typebox'

export const UserBody = Type.Object({
    name: Type.String(),
    mail: Type.Optional(Type.String({ format: 'email' })),
})

export type UserType = Static<typeof UserBody>
