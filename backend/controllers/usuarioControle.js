const usuarioModel = require("../models/usuarioModel");

async function cadastrar(req, res) {

    const { nome_usuario, senha_usuario } = req.body;

    try {

        await usuarioModel.cadastrar(
            nome_usuario,
            senha_usuario
        );

        res.status(201).json({
            mensagem: "Usuário cadastrado!"
        });

    } catch (erro) {

        console.log(erro);

        res.status(500).json({
            erro: "Erro ao cadastrar."
        });

    }

}


async function login(req, res) {

    const { nome_usuario, senha_usuario } = req.body;

    try {

        const usuario = await usuarioModel.login(
            nome_usuario,
            senha_usuario
        );

        if (!usuario) {

            return res.status(401).json({
                mensagem: "Usuário ou senha inválidos."
            });

        }

        res.json(usuario);

    } catch (erro) {

        res.status(500).json({
            mensagem: "Erro no login."
        });

    }

}

module.exports = {
    cadastrar,
    login
};