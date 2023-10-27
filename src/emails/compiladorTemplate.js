const fs = require("fs/promises");
const handlebars = require("handlebars");

const compiladorHtml = async (arquivo, contexto) => {
  const html = await fs.readFile(arquivo);
  const compilador = handlebars.compile(html.toString());
  return compilador(contexto);
};

module.exports = compiladorHtml;
