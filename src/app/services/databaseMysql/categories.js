const categories = deps => {

    return {
        all: () => {
            return new Promise((resolve, reject) => {

                const { connection, errorHandler } = deps
                const querySql = 'SELECT * FROM crianca'

                connection.query(querySql, (error, results) => {

                    if (error) {
                        errorHandler(error, 'Falha ao lista as categorias', reject)
                        return false
                    }
                    resolve({ criancas: results })
                })
            })
        },
        buscarNomeData: (req) => {
            return new Promise((resolve, reject) => {

                const { connection, errorHandler } = deps

                //quando usar o insomnia mudar o req.body.user para req.params
                const { nome_crianca, data_nascimento } = req.body.user

                ds = data_nascimento.split('/').reverse().join('/');

                const querySql = 'SELECT * FROM crianca WHERE nome_crianca = ? AND data_nascimento = ?'

                connection.query(querySql, [nome_crianca, ds], (error, results) => {
                    if (error) {
                        errorHandler(error, 'Falha ao lista as categorias', reject)
                        return false
                    }
                    resolve({ crianca: results })
                })
            })
        },
        save: (req) => {
            return new Promise((resolve, reject) => {
                
                const { connection, errorHandler } = deps
                
                const { 
                    data_abertura,
                    numero_ficha,
                    nome_crianca,
                    data_nascimento,
                    nome_pai,
                    rg_pai,
                    nome_mae,
                    rg_mae,
                    endereco,
                    complemento,
                    numero_casa,
                    ponto_referencia,
                    cidade,
                    telefone,
                    escola,
                    ano_serie,
                    periodo,
                } = req.params
                
                dn = data_nascimento.split('/').reverse().join('/');
                da = data_abertura.split('/').reverse().join('/');
                console.log(da)
               
                const querySql = 'INSERT INTO crianca (data_abertura, numero_ficha, nome_crianca, data_nascimento, nome_pai,rg_pai,nome_mae,rg_mae,endereco,complemento,numero_casa ,ponto_referencia,cidade,telefone,escola,ano_serie,periodo) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)'
               
                const valor = [ 
                    da,
                    numero_ficha,
                    nome_crianca,
                    dn,
                    nome_pai,
                    rg_pai,
                    nome_mae,
                    rg_mae,
                    endereco,
                    complemento,
                    numero_casa,
                    ponto_referencia,
                    cidade,
                    telefone,
                    escola,
                    ano_serie,
                    periodo]

                connection.query(querySql, valor, (error, results) => {

                    if (error) {
                        //tanplate string
                        errorHandler(error, `Falha ao salvar a categoria ${nome_crianca}`, reject)
                        return false
                    }
                    resolve({ category: {nome_crianca, nome_mae, data_nascimento ,id_crianca: results.insertId } })
                })
            })
        },
        update: (id, name) => {
            return new Promise((resolve, reject) => {

                const { connection, errorHandler } = deps

                connection.query('UPDATE categories SET name = ? WHERE id = ?', [name, id], (error, results) => {
                    console.log(results)
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
                    console.log(error)
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

module.exports = categories

