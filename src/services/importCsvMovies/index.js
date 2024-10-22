// @ts-check

import getCsvFiles from "./getCsvFiles.js"
import parseCsvFile from "./parseCsvFile.js"

/**
 * Import movies from CSV files
 * @returns {Promise<Object[]>}
 * @example
 * importCsvMovies()
 */
export default async function importCsvMovies() {
  const csvFiles = await getCsvFiles()

  const movies = await Promise.all(csvFiles.map(parseCsvFile))
  return movies.flat()
}
