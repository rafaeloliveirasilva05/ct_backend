const db = require('../services/databaseMysql')

const routesAtendimento = (server) => {

    server.get('/', async (req, res, next) => {
        try {
            
            res.send("entrei mano")
        } catch (error) {
            res.send(error)
        }
        next()
    })

    server.get('/buscarTodosAtendimentos', async (req, res, next) => {
        try {
            res.send(await db.atendimentoCadastro().all())
        } catch (error) {
            res.send(error)
        }
        next()
    })

    server.get('/buscarAtendimento2NaoRalizado', async (req, res, next) => {
        try {
            res.send(await db.atendimentoCadastro().buscarAtendimento2NaoRalizado())
        } catch (error) {
            res.send(error)
        }
        next()
    })

    server.post('/cadastrarCrianca/atendimento', async (req, res, next) => {

        try {
            res.send(await db.atendimentoCadastro().saveAtendimento1(req))

        } catch (error) {
            res.send(error)

        }
        next()
    })

    server.put('/cadastrarCrianca/atendimento2', async (req, res, next) => {

        try {
            res.send(await db.atendimentoCadastro().saveAtendimento2(req))

        } catch (error) {
            res.send(error)

        }
        next()
    })
}

module.exports = routesAtendimento
