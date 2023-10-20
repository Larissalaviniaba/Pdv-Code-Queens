const knex = require("../../conexaoBanco");
const { errosGerais, errosCliente } = require("../../constants/erroMensagens");

async function detalharCliente(req, res) {
    try {
        const idRequisitado = Number(req.params.id);

        if (isNaN(idRequisitado)) {
            return res.status(404).json({ mensagem: errosCliente.idInvalido });
        };

        const clienteId = await knex('clientes').select('*').where('id', '=', idRequisitado);

        if(clienteId.length === 0) {
            return res.status(404).json({ mensagem: errosCliente.idInexistente });
        };

        return res.status(200).json(clienteId);

    } catch (error) {
        return res.status(500).json({ mensagem: errosGerais.erroServidor });
    }
};

module.exports = detalharCliente;