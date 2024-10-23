// @ts-check
import { createServer } from 'node:http';
import importCsvMovies from "./services/importCsvMovies/index.js";
import { runSeed } from './db.js';
import getProducersIntervalAwards from './services/producers/interval-awards.js';

const SERVER_PORT = 3000

const server = createServer((req, res) => {
  const { url, method } = req
  console.info(`${method} ${url}`)

  if (url === '/api/v1/producers/interval-awards' && method === 'GET') {
    const response = getProducersIntervalAwards()

    res.setHeader('Content-Type', 'application/json')
    res.write(JSON.stringify(response))
  }
  // Não responder a requisições que não sejam mapeadas
  res.end()
});

server.listen(SERVER_PORT, async () => {
  const movieList = await importCsvMovies()
  runSeed(movieList)

  console.log(`\n\n\n`);
  console.log(`Server started at http://localhost:${SERVER_PORT}\n`);
  console.log(`You can access the following endpoints:`);
  console.log(`GET http://localhost:${SERVER_PORT}/api/v1/producers/interval-awards`);
})

export default server;
