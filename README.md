# API-RESTful-SGBD
Uma API RESTful para possibilitar a leitura da lista de indicados e vencedores da categoria Pior Filme do Golden Raspberry Awards.

# Como testar a api localmente
Segue aqui algumas instruções para testar a api localmente:

## Requisitos
- node: a versão correta esta no arquivo `.nvmrc`
```bash
 nvm use
```

## Instalação das dependências do projeto
```bash
npm install
```

## Arquivo de carga
Criar um ou mais arquivos de carga dentro da pasta `./toScan`.
O arquivo deve ser um `.csv` valido e conter as seguintes colunas:
- 'year'
- 'title'
- 'studios'
- 'producers'
- 'winner'
(a ordem deve ser respeitada)

## Rodando o projeto
```bash
npm start
```

## Chamando a api
Ao iniciar o projeto ele irá anunciar que a api esta online, a partir de então é possível testar a funcionalidade
```bash
curl http://localhost:3000/api/v1/producers/interval-awards
```
