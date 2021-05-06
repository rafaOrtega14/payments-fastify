import Server from '../../../server'

const test = async () => {
    const app = new Server().fastify

    const response = await app.inject({
        method: 'GET',
        url: '/ping',
    })

    console.log('status code: ', response.statusCode)
    console.log('body: ', response.body)
}
test()
