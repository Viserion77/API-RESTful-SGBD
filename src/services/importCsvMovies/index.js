// @ts-check

const getCsvFiles = require("./getCsvFiles")
const parseCsvFile = require("./parseCsvFile")

/**
 * Import movies from CSV files
 * @returns {Promise<Object[]>}
 * @example
 * importCsvMovies()
 */
async function importCsvMovies() {
  const csvFiles = await getCsvFiles()

  const movies = await Promise.all(csvFiles.map(parseCsvFile))
  return movies.flat()
}

module.exports = importCsvMovies
