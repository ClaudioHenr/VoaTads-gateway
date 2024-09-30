
# Executar o projeto
Abra dois terminais, em um execute o json server, no outro o servidor node

## Rodar json server
json-server --port 5000 data-fake/auth.json

### Em segundo plano
json-server --port 5000 --watch data-fake/auth.json

## Rodar projeto
node index.js

# Instalação dos módulos
npm install http express morgan helmet express-http-proxy cookie-parser body-parser jsonwebtoken dotenv-safe

npm install cors

## Explicação dos módulos
- http: módulo de requisições HTTP
- express: criação de PIs web
- morgan: pacote de log
- helmet: segurança dos headers, como CORS
- express-http-proxy: redirecionar requisições para os microsserviços
- cookie-parser: faz parse de cookies e preenche req.cookies
- body-parser: faz parse do corpo da mensagem e preenche req.body
- jsonwebtoken: implementa JWT (JSON Web Token)
- dotenv-safe: para gerenciar variáveis de ambiente

