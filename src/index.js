// @ts-check
import { createServer } from 'node:http';
import importCsvMovies from "./services/importCsvMovies/index.js";
import { select, runSeed } from './db.js';
import SqlBricks from "sql-bricks";

const server = createServer((req, res) => {
  const { url, method } = req
  console.info(`${method} ${url}`)

  if (url === '/api/v1/producers/interval-awards' && method === 'GET') {
    const total = select(
      SqlBricks
        .select('count(*) as total')
        .from('movies')
        .orderBy('year')
        .toString()
    )
 
    res.setHeader('Content-Type', 'application/json')
    res.write(JSON.stringify(total))
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

  // result wants to be:
  // {
  //   "min": [
  //     {
  //       "producer": "Producer 1",
  //       "interval": 1,
  //       "previousWin": 2008,
  //       "followingWin": 2009
  //     },
  //     {
  //       "producer": "Producer 2",
  //       "interval": 1,
  //       "previousWin": 2018,
  //       "followingWin": 2019
  //     }
  //   ],
  //     "max": [
  //       {
  //         "producer": "Producer 1",
  //         "interval": 99,
  //         "previousWin": 1900,
  //         "followingWin": 1999
  //       },
  //       {
  //         "producer": "Producer 2",
  //         "interval": 99,
  //         "previousWin": 2000,
  //         "followingWin": 2099
  //       }
  //     ]
  // }
  console.log('GET:', result)
})

