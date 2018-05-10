const db = require('../services/databaseMysql')

const relatorio = (server) => {

    server.get('/relatorio', async (req, res, next) => {
        try {
            res.send(await db.relatorio().all())
        } catch (error) {
            res.send(error)
        }
        next()
    })
}

module.exports = relatorio