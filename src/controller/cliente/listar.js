const knex = require("../../conexaoBanco");
const { errosGerais, errosCliente } = require("../../constants/erroMensagens");

async function listarClientes(req, res) {
    try {
        const { cpf } = req.query;

        if (cpf) {
            const localizarUsuario = await knex("clientes").where('cpf', '=', cpf);

            if (!localizarUsuario) {
                return res.status(404).json({ mensagem: errosCliente.cpfInexistente });
            };

            const usuarioCPF = await knex("clientes").where('cpf', '=', cpf).select('*');
            return res.status(200).json(usuarioCPF);

        } else {
            const clientes = await knex.select('*').from("clientes");
            return res.status(200).json(clientes);
        };

    } catch (error) {
        return res.status(500).json({ mensagem: errosGerais.erroServidor });
    }
};

module.exports = listarClientes;