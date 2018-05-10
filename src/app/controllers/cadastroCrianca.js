
const db = require('../services/databaseMysql')

const routes = (server) => {

    server.get('/buscarTodos', async (req, res, next) => {
        try {
            res.send(await db.categories().all())
        } catch (error) {
            res.send(error)
        }
        next()
    })

    server.post('/procurarNome', async (req, res, next) => {
        try {
            res.send(await db.categories().buscarNomeData(req))
        } catch (error) {
            res.send(error)
        }
        next()
    })

    server.post('/cadastrarCrianca', async (req, res, next) => {
       
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