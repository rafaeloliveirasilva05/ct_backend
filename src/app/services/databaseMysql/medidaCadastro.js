

const medidaCadastro = deps => {

    return {
        all: () => {
            return new Promise((resolve, reject) => {

                const { connection, errorHandler } = deps
                const querySql = 'SELECT * FROM medida'

                connection.query(querySql, (error, results) => {

                    if (error) {

                        errorHandler(error, 'Falha ao lista as medidas', reject)
                        return false
                    }
                    resolve({ medida: results })
                })
            })
        },
        saveMedida: (req) => {
            return new Promise((resolve, reject) => {
                
                const { connection, errorHandler } = deps
                const {
                    id_atendimento,
                    artigo_eca,
                    medida_artigo,
                    direito,
                    agente_violador,
                    identificacao_situação,
                    servico_encaminhado,
                    descricao,
                    procedimento,
                    conselheiro,
                    destino_ficha
                } = req.body.medida
                console.log(req.body.medida)
                

                const querySql = 'INSERT INTO medida (id_atendimento,artigo_eca,medida_artigo,direito,agente_violador,identificacao_situação,servico_encaminhado,descricao,procedimento,conselheiro,destino_ficha) VALUES (?,?,?,?,?,?,?,?,?,?,?)'
                
                const valor = [
                    id_atendimento,
                    artigo_eca, medida_artigo,
                    direito, agente_violador,
                    identificacao_situação,
                    servico_encaminhado,
                    descricao, procedimento,
                    conselheiro,
                    destino_ficha]

                connection.query(querySql, valor, (error, results) => {

                    if (error) {
                        //tanplate string
                        errorHandler(error, 'Falha ao salvar medida')
                        return false
                    }
                    resolve({ medida: { id: results.insertId } })
                })
            })
        },
        saveAtendimento2: (req) => {
            return new Promise((resolve, reject) => {

                const { connection, errorHandler } = deps

                //dados cadastrados do 2º atendimento
                const {
                    servico,
                    como_chegou_ct,
                    conselheiro_atendimento,
                    destino_ficha,
                    data_preenchimento,
                    id_crianca
                } = req.body

                console.log(destino_ficha)

                const querySql = 'UPDATE atendimento SET servico=?, como_chegou_ct=?, conselheiro_atendimento=?, destino_ficha=? ,data_preenchimento=? WHERE id_crianca = ?'
                const valor = [servico, como_chegou_ct, conselheiro_atendimento, destino_ficha, data_preenchimento, id_crianca]

                connection.query(querySql, valor, (error, results) => {

                    if (error || !results.affectedRows) {
                        //tanplate string
                        errorHandler(error, `Falha ao atualizar ao inserir atendimento ${destino_ficha}`, reject)
                        return false
                    }
                    resolve({ category: { destino_ficha, id_crianca }, affectedRows: results.affectedRows })
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

module.exports = medidaCadastro

