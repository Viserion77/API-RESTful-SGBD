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

const port = 3000
server.listen(port, async () => {
  const movieList = await importCsvMovies()
  runSeed(movieList)

  console.log(`\n\n\n`);
  console.log(`Server started at http://localhost:${port}\n`);
  console.log(`You can access the following endpoints:`);
  console.log(`GET http://localhost:${port}/api/v1/producers/interval-awards`);

  // const result = await (await fetch('http://localhost:port/api/v1/producers/interval-awards', {
  //   method: 'GET',
  // })).json()

  // console.log('GET:', result)
})

export default server;
