const db = require('../services/databaseMysql')

const routeMedida = (server) => {

    server.get('/bauscarTodasMedidas', async (req, res, next) => {
        try {
            res.send(await db.medidaCadastro().all())
        } catch (error) {
            res.send(error)
        }
        next()
    })

    server.post('/cadastrarMedida', async (req, res, next) => {
        try {
            res.send(await db.medidaCadastro().saveMedida(req))

        } catch (error) {
            res.send(error)
        }
        next()
    })
}

module.exports = routeMedida