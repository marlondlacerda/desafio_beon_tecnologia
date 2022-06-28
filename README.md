# Desafio Técnico Beon

<img alt="GitHub language count" src="https://img.shields.io/github/languages/count/marlondlacerda/desafio_beon_tecnologia?color=6E40C9&style=flat-square"><img alt="GitHub Top Language" src="https://img.shields.io/github/languages/top/marlondlacerda/desafio_beon_tecnologia?color=2b7489&style=flat-square">
<a href="https://github.com/marlondlacerda/desafio_beon_tecnologia/commits/main"><img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/marlondlacerda/desafio_beon_tecnologia?color=6E40C9&style=flat-square"></a>

<img align="right" src="public/img/beonlogo.jpeg" width="250px" alt="python in pixel art">

## Tópicos

[Sobre a Api](#sobre-a-api)

[Tecnologias](#tecnologias)

[Instalação e uso](#instalação-e-uso)

<br>
<br>
<br>
<br>

---

## Sobre a Api

Uma API desenvolvida em Typescript, Redis, MongoDB, NodeJS e AWS Lambda para o desafio Beon.

É uma API RESTful que utiliza o padrão de nomeação de rotas para identificar os endpoints. Executar CRUD em um banco de dados MongoDB. E o Redis para armazenar os dados em cache.  

---

## Tecnologias

### Principais

- Ioredis - Redis
- Mongoose - MongoDB
- Zod
- Git
- GitHub
- Docker
- Typescript

### Para o Desenvolvimento

- Serverless Offline
- Mocha
- Chai
- Sinon
- Eslint
- Lambda Tester

---

## Instalação e uso

### Body - Corpo da requisição

```bash
{
  "name": string,
  "execution_date": date, (no formato ISO ou YYYY-MM-DD,)
  "situation": enum string ("Pendente" | "Concluído")
  "priority": enum string ("Baixa" | "Média" | "Alta")
  "conclusion_date": date, (no formato ISO ou YYYY-MM-DD,)
}
```

### Configuração e Instalação


```bash
# Abra um terminal e copie este repositório com o comando
git clone git@github.com:marlondlacerda/desafio_beon_tecnologia.git
# ou use a opção de download

# Entre na pasta com 
cd desafio_beon_tecnologia

# Crie um arquivo .env para setar as variáveis de ambiente, utilize o arquivo .env.example 
#como referência

#COM O DOCKER-COMPOSE
# Execute o comando
docker-compose up --build

##obs caso der erro de variáveis de ambiente, vá no arquivo docker-compose.yml e nas sessões
# environment, adicione as variáveis de ambiente para cada sessão

## Após o docker-compose terminar, você estará apto para executar as requisições

#COM O NODEJS E SERVERLESS OFFLINE
# Execute o comando
npm install

# após a instalação, execute o comando
serverless offline start

#Após a execução, você estará apto para executar as requisições
```

Com o serverless offline local ou docker compose no ar, observe o corpo de requisição exemplo abaixo e execute as requisições para testar o funcionamento da API.

```bash
{
  "name": "Desafio Beon",
  "execution_date": "2020-01-01",
  "situation": "Pendente",
  "priority": "Baixa",
  "conclusion_date": "2020-01-01"
}
```

---

Método: POST <br>
Path: /dev/todo/ <br>
StatusCode: 201 <br>
Irá criar um novo item na lista de tarefas.e o seu _id

Método: GET <br>
Path: /dev/todo/ <br>
StatusCode: 200
Irá retornar todos os itens da lista de tarefas.

Método: GET <br>
Path: /dev/todo/:id <br>
StatusCode: 200
Com o id do item, irá retornar o item específico.

Método: PUT <br>
Path: /dev/todo/:id <br>
StatusCode: 204 <br>
Com o id do item, irá atualizar o item específico. Não retorna nada.

Método: DELETE <br>
Path: /dev/todo/:id <br>
StatusCode: 204 <br>
Com o id do item, irá deletar o item específico. Não retorna nada.

---
