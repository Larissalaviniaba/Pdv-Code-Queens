DROP TABLE IF EXISTS categorias;

CREATE TABLE categorias (
  id serial primary key,
  nome text,
  descricao text
);

INSERT INTO categorias (nome, descricao) 
VALUES ('Informática', 'Produtos eletrônicos e acessórios para computadores.'),
('Celulares', 'Smartphones e acessórios relacionados.'),
('Beleza e Perfumaria', 'Produtos de cuidados pessoais e fragrâncias.'),
('Mercado', 'Itens de supermercado e necessidades básicas.'),
('Livros e Papelaria', 'Livros e material de escrita.'),
('Brinquedos', 'Brinquedos para crianças de todas as idades.'),
('Games', 'Jogos eletrônicos e consoles.'),
('Bebê', 'Produtos para cuidados com bebês.'),
('Moda', 'Roupas, calçados e acessórios de moda.');