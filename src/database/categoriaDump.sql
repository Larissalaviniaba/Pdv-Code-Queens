DROP TABLE IF EXISTS categorias;

CREATE TABLE categorias (
    id SERIAL PRIMARY KEY,
    descricao TEXT
);

INSERT INTO categorias ( descricao )
VALUES 
('Informática'), 
('Celulares'), 
('Beleza e Perfumaria'), 
('Mercado'), 
('Livros e Papelaria'), 
('Brinquedos'), 
('Games'), 
('Bebê'), 
('Moda');