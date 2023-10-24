DROP TABLE IF EXISTS produtos;

CREATE TABLE produtos(
    id SERIAL PRIMARY KEY,
    descricao TEXT NOT NULL,
    quantidade_estoque INT NOT NULL,
    valor INT NOT NULL,
    categoria_id INT REFERENCES categorias(id)
);

ALTER TABLE produtos
ADD produto_imagem TEXT;