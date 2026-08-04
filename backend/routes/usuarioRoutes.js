const express = require("express");

const router = express.Router();

const usuarioController = require("../controllers/usuarioControle");

router.post(
    "/",
    usuarioController.cadastrar
);

module.exports = router;