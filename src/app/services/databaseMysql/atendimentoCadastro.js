

const atendimentoCadastro = deps => {

    return {
        all: () => {
            return new Promise((resolve, reject) => {

                const { connection, errorHandler } = deps
                const querySql = 'SELECT * FROM atendimento'

                connection.query(querySql, (error, results) => {

                    if (error) {

                        errorHandler(error, 'Falha ao lista as categorias', reject)
                        return false
                    }
                    resolve({ atendimento: results })
                })
            })
        },
        buscarAtendimento2NaoRalizado: () => {
            return new Promise((resolve, reject) => {

                const { connection, errorHandler } = deps
                //const querySql = 'SELECT * FROM atendimento WHERE p2_atendimento = 0'
                const querySql = 'select * from crianca inner join atendimento on crianca.id_crianca = atendimento.id_crianca where atendimento.p2_atendimento = 0'

                connection.query(querySql, (error, results) => {
                    console.log(results)
                    if (error) {

                        errorHandler(error, 'Falha ao lista as atendimento não realizado', reject)
                        return false
                    }
                    resolve({ atendimento: results })
                })
            })
        },
        saveAtendimento1: (req) => {
            return new Promise((resolve, reject) => {

                const { connection, errorHandler } = deps
                const {
                    id_crianca,
                    numero_ficha,
                    mes,
                    data_abertura,
                    horario,
                    CT,
                    bairro,
                    quem_compareceu,
                    grau_parentesco,
                    p2_atendimento
                } = req.body.user

                ds = data_abertura.split('/').reverse().join('/');

                const querySql = 'INSERT INTO atendimento (id_crianca, numero_ficha, mes, data_abertura, horario, CT, bairro, quem_compareceu, grau_parentesco,p2_atendimento) VALUES (?,?,?,?,?,?,?,?,?,?)'
                const valor = [id_crianca, numero_ficha, mes, ds, horario, CT, bairro, quem_compareceu, grau_parentesco,p2_atendimento]

                connection.query(querySql, valor, (error, results) => {

                    if (error) {
                        //tanplate string
                        errorHandler(error, `Falha ao salvar atendimento ${quem_compareceu}`, reject)
                        return false
                    }
                    resolve({ atendimento: {id: results.insertId }})
                })
            })
        },
        saveAtendimento2: (req) => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps

                //dados cadastrados do 2º atendimento
                const {
                    id_atendimento,
                    id_crianca,
                    servico,
                    como_chegou_ct,
                    conselheiro_atendimento,
                    destino_ficha,
                    data_preenchimento,
                    p2_atendimento
                } = req.body.atendimento_p2
                ds = data_preenchimento.split('/').reverse().join('/');
                
                const querySql = 'UPDATE atendimento SET id_crianca=?, servico=?, como_chegou_ct=?, conselheiro_atendimento=?, destino_ficha=? ,data_preenchimento=?, p2_atendimento=? WHERE  id_atendimento= ?'
                const valor = [id_crianca, servico, como_chegou_ct, conselheiro_atendimento, destino_ficha, ds, p2_atendimento, id_atendimento]

                connection.query(querySql, valor, (error, results) => {

                    if (error || !results.affectedRows) {
                        //tanplate string
                        errorHandler(error, `Falha ao atualizar ao inserir atendimento ${destino_ficha}`, reject)
                        return false
                    }
                    resolve({ category: { destino_ficha,  id_crianca, }, affectedRows: results.affectedRows })
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

module.exports = atendimentoCadastro

