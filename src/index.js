// @ts-check
import { createServer } from 'node:http';
import importCsvMovies from "./services/importCsvMovies/index.js";
import { select, runSeed } from './db.js';
import SqlBricks from "sql-bricks";

const server = createServer((req, res) => {
  const { url, method } = req
  console.info(`${method} ${url}`)

  if (url === '/api/v1/producers/interval-awards' && method === 'GET') {
    const producers = select(
      SqlBricks
        .select('*')
        .from('producers')
        .where(SqlBricks.isNotNull('max_previousWin'))
        .toString()
    )

    const min = []
    const max = []
    for (const producer of producers) {
      min.push({
        producer: producer.name,
        interval: producer.min_interval,
        previousWin: producer.min_previousWin,
        followingWin: producer.min_followingWin
      })
      max.push({
        producer: producer.name,
        interval: producer.max_interval,
        previousWin: producer.max_previousWin,
        followingWin: producer.max_followingWin
      })
    }
 
    res.setHeader('Content-Type', 'application/json')
    res.write(JSON.stringify({ min, max }))
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

