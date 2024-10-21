// @ts-check

const importCsvMovies = require("./services/importCsvMovies");

(async () => {
  const movieLiest = await importCsvMovies()

  console.log(movieLiest)
})()
