const bcrypt = require("bcrypt")
const knex = require("../conexaoBanco")
const jwt = require("jsonwebtoken")
const erroMensagens = require("../constants/erroMensagens")
const senhaJwt =require("../senhaJwt")


const efatuarLogin = async(req, res) => {

    try {
        const { email, senha } = req.body;

        if(!email.trim() || !senha.trim()){
            return res.status(400).json({
                mensagem: erroMensagens.loginDadosInvalido})
        }

        const usuario = await knex('usuarios').where('email', email).first()

        if(!usuario){
            return res.status(404).json({
                mensagem: erroMensagens.loginInvalido})
        } 

        const validarSenha = await bcrypt.compare(senha, usuario.senha);

        if(!validarSenha){
            return res.status(404).json({mensagem: erroMensagens.loginInvalido})
        }

        const token = jwt.sign({ id: usuario.id }, senhaJwt, {
            expiresIn: '8h',
        })

        const { senha:_, ...usuarioLogado } = usuario;

        return res.status(200).json({
            usuarioLogado, token
        })

        
    } catch (error) {
        return res.status(500).json({ mensagem: erroMensagens.erroServidor } )
    }

}

module.exports = efatuarLogin
