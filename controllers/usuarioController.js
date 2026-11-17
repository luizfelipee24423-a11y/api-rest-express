const usuarioModel = require("../models/usuarioModel");

function obterId(req, res) {
  if (!/^[1-9]\d*$/.test(req.params.id)) {
    res.status(400).json({ erro: "ID invalido" });
    return null;
  }
  const id = Number(req.params.id);
  if (!Number.isSafeInteger(id)) {
    res.status(400).json({ erro: "ID invalido" });
    return null;
  }
  return id;
}

function obterNome(req, res) {
  const nome = req.body?.nome;
  if (typeof nome !== "string" || !nome.trim() || nome.trim().length > 255) {
    res
      .status(400)
      .json({ erro: "Informe um nome valido de ate 255 caracteres" });
    return null;
  }
  return nome.trim();
}

async function listar(req, res, next) {
  try {
    res.json(await usuarioModel.listar());
  } catch (erro) {
    next(erro);
  }
}

async function buscarPorId(req, res, next) {
  const id = obterId(req, res);
  if (id === null) return;
  try {
    const usuario = await usuarioModel.buscarPorId(id);
    if (!usuario)
      return res.status(404).json({ erro: "Usuario nao encontrado" });
    res.json(usuario);
  } catch (erro) {
    next(erro);
  }
}

async function criar(req, res, next) {
  const nome = obterNome(req, res);
  if (nome === null) return;
  try {
    res.status(201).json(await usuarioModel.criar(nome));
  } catch (erro) {
    next(erro);
  }
}

async function atualizar(req, res, next) {
  const id = obterId(req, res);
  if (id === null) return;
  const nome = obterNome(req, res);
  if (nome === null) return;
  try {
    const usuario = await usuarioModel.atualizar(id, nome);
    if (!usuario)
      return res.status(404).json({ erro: "Usuario nao encontrado" });
    res.json(usuario);
  } catch (erro) {
    next(erro);
  }
}

async function remover(req, res, next) {
  const id = obterId(req, res);
  if (id === null) return;
  try {
    const removido = await usuarioModel.remover(id);
    if (!removido)
      return res.status(404).json({ erro: "Usuario nao encontrado" });
    res.json({ mensagem: "Usuario removido" });
  } catch (erro) {
    next(erro);
  }
}

module.exports = { listar, buscarPorId, criar, atualizar, remover };
