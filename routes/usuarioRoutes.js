const express = require("express");
const usuarioController = require("../controllers/usuarioController");
const auth = require("../middlewares/auth");

const router = express.Router();
router.use(auth);
router.get("/", usuarioController.listar);
router.get("/:id", usuarioController.buscarPorId);
router.post("/", usuarioController.criar);
router.put("/:id", usuarioController.atualizar);
router.delete("/:id", usuarioController.remover);

module.exports = router;
