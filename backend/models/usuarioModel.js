const conexao = require("../config/db");

function cadastrar(nome_usuario, senha_usuario) {

    const sql = `
        INSERT INTO usuario(nome_usuario, senha_usuario)
        VALUES (?, ?)
    `;

    return new Promise((resolve, reject) => {

        conexao.query(
            sql,
            [nome_usuario, senha_usuario],
            (erro, resultado) => {

                if (erro)
                    reject(erro);
                else
                    resolve(resultado);

            }
        );

    });

}

// NOVA FUNÇÃO
function login(nome_usuario, senha_usuario) {

    const sql = `
        SELECT *
        FROM usuario
        WHERE nome_usuario = ?
        AND senha_usuario = ?
    `;

    return new Promise((resolve, reject) => {

        conexao.query(
            sql,
            [nome_usuario, senha_usuario],
            (erro, resultado) => {

                if (erro)
                    reject(erro);
                else
                    resolve(resultado[0]); // retorna somente o usuário encontrado

            }
        );

    });

}

module.exports = {
    cadastrar,
    login
};
