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

## Rodando os testes de integração
```bash
npm test
```
(Importante alertar que o arquivo `movielist.csv` é utilizado como base para os testes)

---

# Anotações

## Banco de dados em memoria
Aproveitei a oportunidade do teste para utilizar de um novo recurso experimental do node 22: `sqlite` nativo.
Com ele podemos ter um banco de dados embarcado na aplicação, tendo a opção de salvar o banco em um arquivo ou em memoria
```js
import { DatabaseSync } from 'node:sqlite';
const database = new DatabaseSync(':memory:'); // salva em memoria
```
```js
import { DatabaseSync } from 'node:sqlite';
const database = new DatabaseSync('./meu-db.sqlite'); // salva em um arquivo
```

## Recursos utilizados
- dev container, facilita a criação de um ambiente de desenvolvimento(config: `.devcontainer/devcontainer.json`).
- vscode debugger, configurado um launcher para debugar o projeto enquanto realizamos alterações(config: `.vscode/launch.json`)
- sql-bricks, lib que ajuda na criação de scripts sql dinâmicos, além de proteger de possíveis ataques de sql injection.
- jest, lib para ajudar a criar o teste de integração do sistema
- jsdoc, utilizado para ajudar a criar o projeto com mais precisão, ajudando nas tipagens e documentações
- nvm, auxiliando na instalação da versão correta do node para o projeto(junto com o arquivo `.nvmrc`).

## Sobre as escolhas de arquitetura
Foi escolhido o caminho de processar os dados recebidos em memoria do js, e salvando os dados compilados no banco,
isto pois entendi que não será adicionado ou alterado nenhum dado enquanto a aplicação estiver online.

há possibilidade de melhorar a parte de escalabilidade migrando esse calculo para rodar na hora da resposta ao endpoint, sendo processado pelo próprio sqlite.
