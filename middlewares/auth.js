function auth(req, res, next) {
  const tokenEsperado = process.env.API_TOKEN;
  if (!tokenEsperado) return next();
  if (req.headers.authorization !== `Bearer ${tokenEsperado}`) {
    return res.status(401).json({ erro: "Nao autorizado" });
  }
  next();
}
module.exports = auth;
