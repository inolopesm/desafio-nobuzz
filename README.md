# desafio-nobuzz

## Pré-requisitos

- Node.js (Confirmar versão no `package.json`)
- NPM.js (Confirmar versão no `package.json`)
- `github:inolopesm/desafio-nobuzz-api`

## Instalação

```
$ npm install
```

## Configuração

```
cp .env.example .env.local
code .env # ou seu editor de código de preferência para alterar os valores
```

**Variáveis de Ambiente**

- VITE_API_BASE_URL: url de conexão com a api

## Rodando a aplicação

```
# desenvolvimento
$ npm run dev

# modo de produção
$ npm run build
$ npx serve dist # ou PREFERENCIALMENTE UTILIZE UM SERVIÇO NA NUVEM PARA EXPOR OS ARQUIVOS
```
