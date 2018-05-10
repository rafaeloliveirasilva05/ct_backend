

const relatorio = deps => {

    return {
        all: () => {
            return new Promise((resolve, reject) => {

                const { connection, errorHandler } = deps
                const querySql = 'select * from crianca inner join atendimento on crianca.id_crianca = atendimento.id_crianca'
                connection.query(querySql, (error, results) => {

                    if (error) {

                        errorHandler(error, 'Falha ao lista as categorias', reject)
                        return false
                    }
                    resolve({ atendimento: results })
                })
            })
        }
    }
}

module.exports = relatorio

