CREATE TABLE clientes(
    id SERIAL PRIMARY KEY, 
    nome TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    cpf TEXT UNIQUE NOT NULL,
    cep TEXT,
    rua TEXT,
    numero INT,
    bairro TEXT,
    cidade TEXT,
    estado TEXT
)
