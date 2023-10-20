const seCampoExiste = (res, campo, codRetorno, mensagem) => {
  if (campo) {
    return res.status(codRetorno).json({
      mensagem,
    });
  }
};
const seCampoNaoExiste = (res, campo, codRetorno, mensagem) => {
  if (!campo) {
    return res.status(codRetorno).json({
      mensagem,
    });
  }
};

module.exports = {
  seCampoExiste,
  seCampoNaoExiste,
};
