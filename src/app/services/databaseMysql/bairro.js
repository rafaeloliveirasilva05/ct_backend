

const bairro = deps => {

    return {
        all: () => {
            return new Promise((resolve, reject) => {

                const { connection, errorHandler } = deps
                const querySql = 'SELECT * FROM bairros'

                connection.query(querySql, (error, results) => {
                   
                    if (error) {
                        errorHandler(error, 'Falha ao lista os bairros', reject)
                        return false
                    }
                    resolve({ bairros: results })
                })
            })
        },
        buscarBairroCT: (req) => {
            return new Promise((resolve, reject) => {
                console.log(req.body.CT)
                
                const { connection, errorHandler } = deps
                const  CT  = req.body.CT
               
               
                const querySql = 'select * from bairros where ct = ?'

                connection.query(querySql, CT, (error, results) => {
                    if (error) {
                        errorHandler(error, 'Falha ao lista os bairros', reject)
                        return false
                    }
                    resolve({ bairros: results })
                })
            })
        },
        save: (req) => {
            return new Promise((resolve, reject) => {

                const { connection, errorHandler } = deps
                const { nome_crianca, data_nascimento } = req.params

                ds = data_nascimento.split('/').reverse().join('/');

                const querySql = 'INSERT INTO crianca (nome_crianca, data_nascimento) VALUES (?,?)'

                connection.query(querySql, [nome_crianca, ds], (error, results) => {

                    if (error) {
                        //tanplate string
                        errorHandler(error, `Falha ao salvar a categoria ${nome_crianca}`, reject)
                        return false
                    }
                    resolve({ category: { nome_crianca, id: results.insertId } })
                })
            })
        },
        update: (id, name) => {
            return new Promise((resolve, reject) => {

                const { connection, errorHandler } = deps

                connection.query('UPDATE categories SET name = ? WHERE id = ?', [name, id], (error, results) => {
                    if (error || !results.affectedRows) {
                        //tanplate string
                        errorHandler(error, `Falha ao atualizar a categoria ${name}`, reject)
                        return false
                    }
                    resolve({ category: { name, id }, affectedRows: results.affectedRows })
                })
            })

        },
        del: (id) => {
            return new Promise((resolve, reject) => {

                const { connection, errorHandler } = deps

                connection.query('DELETE FROM categories WHERE id = ?', [id], (error, results) => {
                    if (error || !results.affectedRows) {
                        //tanplate string
                        errorHandler(error, `Falha ao remover a categoria de id ${id}`, reject)
                        return false
                    }
                    resolve({ menssage: 'Categoria removida com sucesso!', affectedRows: results.affectedRows })
                })
            })
        },
    }
}

module.exports = bairro

