CREATE TABLE pedido_produtos (
    id INT PRIMARY KEY,
    pedido_id INT REFERENCES pedidos(id),
    produto_id INT REFERENCES produtos(id),
    quantidade_produto INT NOT NULL,
    valor_produto INT
);