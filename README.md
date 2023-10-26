# 👑 Back-end - API REST PDV: Code Queens

<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/Larissalaviniaba/Pdv-Code-Queens?color=blue">

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/Larissalaviniaba/Pdv-Code-Queens?color=blue">
  
  <a href="https://github.com/Larissalaviniaba/Pdv-Code-Queens/commits/main">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/Larissalaviniaba/Pdv-Code-Queens?color=blue">
  </a>
   
   <a href="https://github.com/Larissalaviniaba/Pdv-Code-Queens/stargazers">
    <img alt="Stargazers" src="https://img.shields.io/github/stars/Larissalaviniaba/Pdv-Code-Queens?style=social">
  </a>
</p>
<p align="center">
    <a href="https://github.com/Larissalaviniaba/Pdv-Code-Queens">
    <img alt="Projeto desenvolvido em grupo" src="https://img.shields.io/badge/desenvolvido-por%20Aline%20Lombardi,%20Ariel%20Sena,%20Karla%20Gonçalves,%20Larissa%20Lavínia%20e%20Poliana%20Santos-D818A5">
   </a>
</p>

<h4 align=center> 
	🚧 API REST - PDV Code Queens 🚧
</h4>

<p align="center">
	<img alt="Status Em Desenvolvimento" src="https://img.shields.io/badge/STATUS-%20CONCLUÍDO-green">
</p>

## 🎲 Demonstração da Aplicação

O deploy da aplicação está disponível no cyclic:
<div align="center">
<a href="https://clumsy-slug-earmuffs.cyclic.cloud">
  <img alt="Deploy feito por Larrissa Lavínia" src="https://img.shields.io/badge/ACESSAR-%20DEPLOY-blue">
</a>
</div>

## 📝 Sobre o projeto

Este projeto consiste em uma API REST desenvolvida para simular operações em um sistema de compra e venda (PDV). O projeto foi desenvolvido em grupo e dividido em três sprints, isto é, três etapas. O objetivo desse projeto é fornecer uma base para a construção de um sistema completo de um PDV, seguindo os padrões REST, banco de dados relacional utilizando Deploy.

## 📋 Funcionalidades

Nesse projeto API REST - PDV é possível:

- Sprint 01:
    - Listar categorias (sem necessidade de login);
    - Criar conta de usuário;
    - Fazer login;
    - Detalhar conta de usuário (necessário login);
    - Editar conta de usuário (necessário login).
  
- Sprint 02: 
  - Todas as funcionalidades (endpoints) dessa sprint exigem o token de autenticação do usuário logado.
    - Cadastrar Produto;
    - Editar dados do produto;
    - Listar Produtos;
    - Detalhar Produto;
    - Excluir Produto por ID;
    - Cadastrar Cliente;
    - Editar dados do cliente;
    - Listar Clientes;
    - Detalhar Cliente por ID.
  
- Sprint 03:
  - Todas as funcionalidades (endpoints) dessa sprint exigem o token de autenticação do usuário logado.
    - Cadastrar Pedidos;
    - Listar Pedidos;
    - Aprimorar cadastro/atualização de produto para incluir imagens no banco de dados;
    - Melhorar exclusão de produto (eliminar imagem do banco de dados).

## ▶️ Como executar o projeto

### 🏗️ Estrutura da API REST

Essa API REST foi organizada de forma a manter a clareza e a modularidade do projeto. Os elementos da API REST estão distribuídos dentro da pasta `src`, como segue:

- Arquivo `index.js`: Este é o ponto de entrada da aplicação, onde a execução do servidor é iniciada. Ele configura as dependências necessárias e inicia a escuta por requisições;
- Arquivo `conexaoBanco`: Este arquivo é responsável por estabelecer a conexão com o banco de dados PostgreSQL, utilizando a biblioteca `knex`. Ele faz uso de variáveis de ambiente configuradas no arquivo `.env` para garantir a segurança e a flexibilidade das informações de conexão;
- Pasta `controller`: Esta pasta abriga todas as funções responsáveis por executar as operações relacionadas às rotas da API;
- Pasta `routes`: Esta pasta contém todos os arquivos onde as rotas da API estão definidas;
- Pasta `database`: Aqui são armazenados os arquivos utilizados para construir as tabelas do banco de dados usando PostgreSQL;
- Pasta `middleware`: Contém as definições de `middlewares`, que são funções intermediárias que podem ser executadas antes das rotas ou após as requisições;
- Pasta `constants`: Esta pasta é responsável por armazenar as mensagens de erros e de sucesso do projeto;
- Pasta `schemas`: Nesta pasta, estão armazenados os `schemas` que definem a estrutura e as restrições dos objetos de dados utilizados pela API;

- Fora da pasta `src`, na raiz do projeto, contém o arquivo `.env.exemple`. Esse arquivo é um modelo para configurar as variáveis de ambiente necessárias para o funcionamento adequado da aplicação.

### 🛠️ Pré-requisitos

- Possuir um editor de código-fonte, por exemplo [VSCode](https://code.visualstudio.com/download) ou [Vim](https://www.vim.org/download.php);
- Possuir o [Git](https://git-scm.com/downloads) ou qualquer outro programa de versionamento;
- Possuir o [Node.js](https://nodejs.org/en/download/current) (versão 18.16.0 ou superior);
- Possuir o [Insomnia](https://insomnia.rest/download) instalado.

### ⚙️ Instalação

Siga as etapas abaixo para configurar e executar a API em sua máquina local:

1. Faça um fork deste repositório;
2. Clone este repositório em sua máquina local;
3. Navegue até o diretório do projeto:
```
cd nome_da_pasta
```
4. Instale as dependências necessárias executando o comando:
```
npm install
```
5. Inicie o servidor local com o seguinte comando:
```
npm run dev
```
6. Aguarde até que a mensagem `O servidor está rodando em http://localhost:3000/` seja exibida no terminal;
7. Após a confirmação acima, abra o Insomnia ou qualquer outra ferramenta similar e configure um novo ambiente para testar as rotas da API;
   
⚠️ Ademais, é possível importar o arquivo `insomnia.json` localizado na raiz desse projeto projeto. Esse arquivo contém as configurações pré-definidas necessárias para testar as rotas da API de maneira fácil e eficiente.

Por fim, certifique-se de verificar no projeto as rotas disponíveis e os formatos de dados aceitos.

## 🚀 Tecnologias Utilizadas

1. Node.js (versão 18.16.0);

2. Bibliotecas:
   
- nodemon (versão 3.0.1);
- bcrypt: (versão 5.1.1);
- dotenv: (versão 16.3.1);
- express (versão 4.18.2);
- joi (versão 17.11.0);
- jsonwebtoken (versão 9.0.2);
- knex (versão 3.0.1);
- pg ou node-postgres (versão 8.11.3).

3. Linguagem de programação utilizada:
   
- JavaScript.

## 🤝 Contribuição

Contribuições são bem-vindas! Se você quiser melhorar ou adicionar novos recursos a esta API, siga as etapas abaixo:

1. Crie um Fork deste repositório;
2. Crie uma branch para suas alterações: 
```
git checkout -b my-feature
```
3. Commit suas alterações: 
```
git commit -m 'Adicionar nova funcionalidade'
```
4. Faça push para a branch: 
```
git push origin my-feature
```
5. Abra um pull request.

## 🧙‍♂️ Autoras

Esse projeto Back-end foi desenvolvido em grupo como desafio do modulo 5 do curso de Desenvolvimento de Software - Foco em Back-end da [Cubos Academy](https://cubos.academy/). ✨
As responsabilidades das integrantes em cada uma das sprints foram:

### 1. Primeira Sprint:

- [Aline Lombardi](https://www.linkedin.com/in/aline-lombardi/): ㅤ ㅤEncarregada de desenvolver as rotas de edição e detalhamento de usuários, além de realizar aprimoramentos nos schemas para o cadastro e edição de usuários, assegurando a consistência e a funcionalidade aprimorada do sistema;

- [Ariel Sena](https://www.linkedin.com/in/arielsena27/):ㅤ ㅤ ㅤ ㅤEncarregada de implementar a rota de cadastro de usuários, garantindo uma integração perfeita e segura com o sistema;

- [Karla Gonçalves](https://www.linkedin.com/in/karla-goncalves-s/):ㅤ ㅤEncarregado de estabelecer a rota de login e implementar a autenticação para as rotas protegidas por token, assegurando a segurança e o acesso restrito a recursos sensíveis;

- [Larissa Lavínia](https://www.linkedin.com/in/larissalaviniaba/):ㅤㅤㅤEncarregada do deploy, configuração do banco de dados não relacional, criação da rota de listagem de categorias, desenvolvimento dos schemas e aprimoramento dos padrões de código limpo (clean code) em todo o servidor;

- [Poliana Santos](https://www.linkedin.com/in/polianams/): ㅤ ㅤ Líder da equipe, encarregada de delinear o escopo inicial do projeto, implementar os schemas, ajustar os arquivos de mensagens de erro e sucesso, e aprimorar os padrões de clean code em toda a aplicação.

### 2. Segunda Sprint:

- [Aline Lombardi](https://www.linkedin.com/in/aline-lombardi/): ㅤ ㅤEncarregada de implementar o endpoint para listar e detalhar clientes, bem como de contribuir para a definição do escopo do projeto, garantindo uma compreensão abrangente das necessidades do sistema;

- [Ariel Sena](https://www.linkedin.com/in/arielsena27/):ㅤ ㅤ ㅤ ㅤEncarregada de estabelecer a estrutura do banco de dados e desenvolver a rota de exclusão de produtos;

- [Karla Gonçalves](https://www.linkedin.com/in/karla-goncalves-s/):ㅤ ㅤEncarregada de implementar a rota para listar e detalhar produtos, garantindo uma integração eficiente e precisa com os requisitos do sistema;

- [Larissa Lavínia](https://www.linkedin.com/in/larissalaviniaba/):ㅤㅤㅤEncarregada de implementar os endpoints para a funcionalidade de cadastro e edição de clientes, ao mesmo tempo em que aprimorou os schemas relacionados às rotas de clientes e produtos. Responsável por otimizar os recursos dos arquivos de mensagens de erro e sucesso, seguindo as diretrizes estabelecidas. Além disso, contribuiu significativamente para o aprimoramento dos padrões de clean code em todo o servidor;

- [Poliana Santos](https://www.linkedin.com/in/polianams/): ㅤ ㅤ Encarregada de delinear o escopo da segunda sprint do projeto, bem como ajudar no desenvolvimento dos schemas das rotas de produtos e clientes. Responsável por otimizar os arquivos de mensagens de erro e sucesso, em conformidade com as diretrizes estabelecidas. Além disso, encarregada de fortalecer consistentemente os padrões de clean code em toda a arquitetura da aplicação. Adicionalmente, assumiu a responsabilidade pela concepção e implementação das rotas de cadastro e atualização de produtos.
  
### 3. Terceira Sprint:

- [Aline Lombardi](https://www.linkedin.com/in/aline-lombardi/): ㅤ ㅤEncarregada de implementar o endpoint de atualizar e deletar produto, bem como de contribuir para a definição do escopo do projeto da terceira sprint garantindo uma compreensão abrangente das necessidades do sistema;

- [Ariel Sena](https://www.linkedin.com/in/arielsena27/):ㅤ ㅤ ㅤ ㅤEncarregada de estabelecer a estrutura do banco de dados;

- [Karla Gonçalves](https://www.linkedin.com/in/karla-goncalves-s/):ㅤ ㅤEncarregada de implementar a rota para listar pedidos;

- [Larissa Lavínia](https://www.linkedin.com/in/larissalaviniaba/):ㅤㅤㅤEncarregada de implementar os endpoints para a funcionalidade de cadastro de pedidos, ao mesmo tempo em que aprimorou os schemas relacionados à rota de cadastro de pedidos. Responsável por otimizar os recursos dos arquivos de mensagens de erro e sucesso, seguindo as diretrizes estabelecidas. Além disso, contribuiu significativamente a elaboração do escopo do projeto na terceira sprint e o aprimoramento dos padrões de clean code em todo o servidor;

- [Poliana Santos](https://www.linkedin.com/in/polianams/): ㅤ ㅤ Encarregada de delinear o escopo da terceira sprint do projeto, bem como ajudar no desenvolvimento dos schemas das rotas de cadastro de pedidos. Além disso, encarregada de fortalecer consistentemente os padrões de clean code em toda a arquitetura da aplicação. Adicionalmente, contribuiu para a elaboração das rotas de cadastro, atualização e exclusão de produtos.

## 📝 Licença

Este projeto esta sobe a licença [MIT](./LICENSE).

Divirta-se explorando a API! 🌟

###### tags: `módulo 5` `desafio` `api` `node.js` `back-end` `API REST` `PostgreSQL`, `SQL`, `javascript`