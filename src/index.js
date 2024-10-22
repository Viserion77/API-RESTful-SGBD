// @ts-check
import { createServer } from 'node:http';
import importCsvMovies from "./services/importCsvMovies/index.js";
import { runSeed } from './db.js';
import getProducersIntervalAwards from './services/producers/interval-awards.js';

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

server.listen(3000, async () => {
  const movieLiest = await importCsvMovies()
  runSeed(movieLiest)

  console.log('Server started at http://localhost:3000');

  const result = await (await fetch('http://localhost:3000/api/v1/producers/interval-awards', {
    method: 'GET',
  })).json()

  console.log('GET:', result)
})

