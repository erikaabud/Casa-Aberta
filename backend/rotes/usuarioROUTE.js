const express = require("express");
const usuario_controller=require("../controllers/usuarioControle")
const router = express.Router();

 
router.get("/listar",usuario_controller.listarUsuarios)
router.post("/",usuario_controller.addUsuario)
 
//listando usuarios usando (get)  
// usando o (post) para add "http://localhost:3000/usuario/"
// usando o (post) para add "http://localhost:3000/usuario/"

module.exports= router;