const bcrypt = require("bcrypt")
const knex = require("../conexaoBanco")
const erroMensagens = require("../constants/erroMensagens")
const sucessoMensagens = require("../constants/sucessoMensagens")

async function criarUsuario(req, res) {
    let erroDeValidacao = await validarRequisicao(req.body)

    if(erroDeValidacao) {
        return res.status(400).json({mensagem: erroDeValidacao})
    } 
 
    let usuario = {
        nome: req.body.nome,
        email: req.body.email,
        senha: await criptografarSenha(req.body.senha)
    }

    cadastrarUsuario(usuario)
    res.status(201).json({mensagem: sucessoMensagens.usuarioSucesso}) // verificar se devemos utilizar .json ou .send
    
}

async function validarRequisicao(body) {
    if(!body.nome || !body.email || !body.senha) {
        return erroMensagens.usuarioCadastroDadosInvalido
    }

    let resultado = await knex('usuarios').where({email: body.email}).select('email').first()

    if(resultado !== undefined) {
        return erroMensagens.usuarioJaExiste
    }
}

async function criptografarSenha(senha) {
    const rounds = 10
    const senhacriptografada = await bcrypt.hash(senha, rounds)
    return senhacriptografada
}

async function cadastrarUsuario(usuario) {
    let guardarNoBanco = await knex('usuarios').insert({nome: usuario.nome, email: usuario.email, senha: usuario.senha})
}



module.exports = {
    criarUsuario

}