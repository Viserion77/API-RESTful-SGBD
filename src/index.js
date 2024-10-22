// @ts-check

import importCsvMovies from "./services/importCsvMovies/index.js";

(async () => {
  const movieLiest = await importCsvMovies()

  console.log(movieLiest.length)
})()
