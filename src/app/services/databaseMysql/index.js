const mysqlServer = require('mysql')

const connection = mysqlServer.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'conselhotutelar'
})

const errorHandler = (error, msg, rejectFunction) => {
    console.error(error)
    rejectFunction({ error: msg })
}

const categoryModule = require('./categories')({ connection, errorHandler })
const atendimentoCastroModule = require('./atendimentoCadastro')({ connection, errorHandler })
const relatorioModule = require('./relatorio')({ connection, errorHandler })
const medidaCadastroModule = require('./medidaCadastro')({ connection, errorHandler })
const bairroCadastroModule = require('./bairro')({ connection, errorHandler })


module.exports = {
    categories: () => categoryModule,
    atendimentoCadastro: () => atendimentoCastroModule,
    relatorio: () => relatorioModule,
    bairro: () => bairroCadastroModule,
    medidaCadastro: () => medidaCadastroModule
}