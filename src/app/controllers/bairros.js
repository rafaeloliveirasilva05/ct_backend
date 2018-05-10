
const db = require('../services/databaseMysql')

const routes = (server) => {

    server.get('/buscarBairros', async (req, res, next) => {
        try {
            res.send(await db.bairro().all())
        } catch (error) {
            res.send(error)
        }
        next()
    })

    server.post('/buscarBairrosCT', async (req, res, next) => {
        try {
            res.send(await db.bairro().buscarBairroCT(req))
        } catch (error) {
            res.send(error)
        }
        next()
    })

    server.post('/cadastrarBairro', async (req, res, next) => {

        try {

            const recebido = await db.categories().save(req)
            res.send(recebido)

            module.exports = recebido;

        } catch (error) {
            res.send(error)

        }
        next()
    })
}

module.exports = routes