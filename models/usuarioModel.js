const { getPool } = require("../config/database");

const usarMysql = process.env.DB_MODE === "mysql";
let usuarios = [
  { id: 1, nome: "João" },
  { id: 2, nome: "Maria" },
];
let proximoId = 3;

async function listar() {
  if (usarMysql) {
    const [linhas] = await getPool().query(
      "SELECT id, nome FROM usuarios ORDER BY id",
    );
    return linhas;
  }
  return usuarios;
}

async function buscarPorId(id) {
  if (usarMysql) {
    const [linhas] = await getPool().execute(
      "SELECT id, nome FROM usuarios WHERE id = ?",
      [id],
    );
    return linhas[0] || null;
  }
  return usuarios.find((usuario) => usuario.id === id) || null;
}

async function criar(nome) {
  if (usarMysql) {
    const [resultado] = await getPool().execute(
      "INSERT INTO usuarios (nome) VALUES (?)",
      [nome],
    );
    return { id: resultado.insertId, nome };
  }
  const usuario = { id: proximoId++, nome };
  usuarios.push(usuario);
  return usuario;
}

async function atualizar(id, nome) {
  if (usarMysql) {
    const [resultado] = await getPool().execute(
      "UPDATE usuarios SET nome = ? WHERE id = ?",
      [nome, id],
    );
    return resultado.affectedRows > 0 ? { id, nome } : null;
  }
  const usuario = usuarios.find((u) => u.id === id);
  if (!usuario) return null;
  usuario.nome = nome;
  return usuario;
}

async function remover(id) {
  if (usarMysql) {
    const [resultado] = await getPool().execute(
      "DELETE FROM usuarios WHERE id = ?",
      [id],
    );
    return resultado.affectedRows > 0;
  }
  const index = usuarios.findIndex((u) => u.id === id);
  if (index === -1) return false;
  usuarios.splice(index, 1);
  return true;
}

module.exports = { listar, buscarPorId, criar, atualizar, remover };
