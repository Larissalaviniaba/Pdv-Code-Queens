DROP TABLE IF EXISTS pedido_produtos;

CREATE TABLE pedido_produtos (
    id SERIAL PRIMARY KEY,
    pedido_id INT REFERENCES pedidos(id),
    produto_id INT REFERENCES produtos(id),
    quantidade_produto INT NOT NULL,
    valor_produto INT
);