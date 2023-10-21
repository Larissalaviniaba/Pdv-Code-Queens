const centavosParaReais = (centavos) => {
  const reais = centavos / 100.0;
  const valorFormatado = `R$ ${reais.toFixed(2)}`;
  return valorFormatado.replace(".", ",");
};

module.exports = centavosParaReais;
