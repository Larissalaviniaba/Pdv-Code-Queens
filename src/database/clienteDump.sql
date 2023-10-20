DROP TABLE IF EXISTS clientes;

CREATE TABLE clientes(
    id SERIAL PRIMARY KEY, 
    nome TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    cpf TEXT UNIQUE NOT NULL,
    cep TEXT,
    rua TEXT,
    numero TEXT,
    bairro TEXT,
    cidade TEXT,
    estado TEXT
)
