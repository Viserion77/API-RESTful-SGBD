// @ts-check

import importCsvMovies from "./services/importCsvMovies/index.js";
import { select, runSeed } from './db.js';
import SqlBricks from "sql-bricks";

(async () => {
  const movieLiest = await importCsvMovies()
  runSeed(movieLiest)

  console.log(select(
    SqlBricks
      .select('count(*) as total')
      .from('movies')
      .toString()
  ))
})()
