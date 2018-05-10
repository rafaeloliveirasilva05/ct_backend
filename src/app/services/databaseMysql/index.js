const mysqlServer = require('mysql')

const connection = mysqlServer.createConnection({
    host: 'us-cdbr-iron-east-04.cleardb.net',
    user: 'bbfa53bdd9b171',
    database: 'heroku_04d412a831f0fa4',
    password : 'e0b65796'
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