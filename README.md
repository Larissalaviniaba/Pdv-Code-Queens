# PDV - CodeQueens 👑

Esse projeto marca a etapa final do curso de Desenvolvimento de Software com ênfase em Back-End, oferecido pela <a href="https://cubos.academy/?utm_term=cubos%20academy&utm_campaign=Conversion+-+Search+-+Branding+-+Cubos+Academy&utm_source=google&utm_medium=cpc&hsa_acc=6320525513&hsa_cam=18154121427&hsa_grp=141084695032&hsa_ad=618464016440&hsa_src=g&hsa_tgt=kwd-1212716925774&hsa_kw=cubos%20academy&hsa_mt=e&hsa_net=adwords&hsa_ver=3&gclid=CjwKCAjwyY6pBhA9EiwAMzmfwZznm0pCci8QyZMBU_L5s_fvzJaukZDPH-qlJGh8Zg6eT7xi21ozyBoCLfkQAvD_BwE">Cubos Academy</a> em parceria com o <a href="https://www.ifood.com.br">iFood</a>.

### Link do deploy:  <a>https://clumsy-slug-earmuffs.cyclic.cloud</a>

## Equipe: 

- <a href="https://www.linkedin.com/in/aline-lombardi/">Aline Lombardi</a>

- <a href="https://www.linkedin.com/in/arielsena27/">Ariel Sena</a>

- <a href="https://www.linkedin.com/in/karla-goncalves-s/">Karla Gonçalves</a>

- <a href="https://www.linkedin.com/in/larissalaviniaba/">Larissa Lavínia</a>

- <a href="https://www.linkedin.com/in/polianams/">Poliana Santos</a>

---

<details>
<summary><b> 1ª Sprint </b></summary>
<br>

<details>
<summary><b> Escopo do projeto</b></summary>

### O que o usuário não logado poderá fazer:

- Listar categorias;
- Cadastrar usuário;
- Efetuar login.


### O que o usuário logado poderá fazer:

- Detalhar perfil do usuário, ou seja, visualizar os dados do seu perfil;
- Editar/Atualizar informações do perfil.

---
<br/>

**Importante 1:** Sempre que a validação de uma requisição falhar, responder com código de erro e mensagem adequada à situação.

**Importante 2:** Para endpoints de cadastro/atualização os objetos de requisição devem conter as propriedades equivalentes as colunas das tabelas.

**Exemplo:**

```javascript
// Corpo da requisição para cadastro de usuário (body)
{
    "nome": "José",
    "email": "jose@email.com",
    "senha": "jose"
}
```
## **Status Codes**

Possíveis **_status codes_** esperados como resposta da API.

```javascript
// 200 (OK) = requisição bem sucedida
// 201 (Created) = requisição bem sucedida e algo foi criado
// 204 (No Content) = requisição bem sucedida, sem conteúdo no corpo da resposta
// 400 (Bad Request) = o servidor não entendeu a requisição pois está com uma sintaxe/formato inválido
// 401 (Unauthorized) = o usuário não está autenticado (logado)
// 403 (Forbidden) = o usuário não tem permissão de acessar o recurso solicitado
// 404 (Not Found) = o servidor não pode encontrar o recurso solicitado
// 500 (Internal Server Error) = erro inesperado do servidor
```
## Banco de Dados:

- Criar um banco de dados PostGreSQL chamado `pdv`.
- Deverá conter as seguintes tabelas:

### 1 - Tabela de usuários:

- **id** (autoincremento);

- **nome** (texto);

- **email** (campo único);

- **senha** (texto).

### 2 - Tabela de categorias:

- **id** (autoincremento);

- **descrição** (texto);

- Cadastrar categorias na tabela.

## Endpoints

### GET - Listar Categorias ( /categoria )

### Dados enviados:

- Nenhum! Não é necessário.

### Dados retornados:

- Lista com as categorias previamente cadastradas no banco de dados.

---

### POST - Cadastrar Usuário  ( /usuario )

### Dados enviados:

Os dados serão enviados por requisição por meio do body:

- **nome**;
- **email**;
- **senha**.

### Dados retornados:

- Sucesso / erro.

### Objetivos Gerais

- Validar nome, email e a senha;
- Verificar se o email já existe no banco de dados;
- Criptografar a senha;
- Cadastrar o usuário no banco de dados;
- Retornar o nome do usuário e email ou uma mensagem de sucesso.
---

### POST - Login ( /login )

### Dados enviados:

Os dados serão enviados por requisição por meio do body:

- **email**;
- **senha**.

### Dados retornados:

- Sucesso / erro;
- **nome**, **email** e **token**.

### Objetivos Gerais

- Validar email e a senha;
- Buscar o usuário no banco de dados;
- Verificar se a senha informada está correta;
- Gerar o token de autenticação;
- Retornar os dados do usuário (nome, email e token).

---

### **GET - Detalhar Perfil do usuário logado ( /usuario )

### Dados enviados:

- **token** (que terá id do usuário logado);

### Dados retornados:

- **id**;
- **nome**;
- **email**.

### Objetivos Gerais

- Validar o token do usuario logado;
- Buscar o cadastro do usuário com a informação do token (com o token é possível obter os dados do usuário);
- Retornar os dados do usuário.

---
### PUT - Editar perfil do usuário ( /usuario )

### Dados enviados:

- **token** (que terá id do usuário logado);

#### Enviar os seguintes dados pelo body:

- **nome**;
- **email**;
- **senha**.

### Dados retornados:

- **id**;
- **nome**;
- **email**.

### Objetivos Gerais

- Validar o token do usuário logado;
- Validar os campos informados no body da requisição;
- Buscar o cadastro do usuário com a informação do token (com o token é possível obter os dados do usuário);
- Verificar se o email novo é único;
- Criptografar a nova senha caso seja modificada;
- Modificar o banco de dados com os novos dados do usuário.

---

## Deploy

- Fazer o deploy;
- Disponibilizar a URL.

</details>
</details>

###### tags: `módulo 5` `desafio` `api` `ApiRest` `node.js`