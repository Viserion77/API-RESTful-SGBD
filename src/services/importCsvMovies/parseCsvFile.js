// @ts-check

const fs = require('fs').promises
const { INVALID_CSV_HEADERS, TO_SCAN_DIRECTORY } = require('./constants')
const parseMovieData = require('./parseMovieData')

/**
 * Parse a CSV file and return the movie list
 * @param {string} file
 * @returns {Promise<Object[]>}
 * @example
 * parseCsvFile('movies.csv')
 */
async function parseCsvFile(file) {
  const content = await fs.readFile(`${TO_SCAN_DIRECTORY}/${file}`, 'utf-8')

  try {
    return parseMovieData(content)
  } catch (error) {
    if (error.cause === INVALID_CSV_HEADERS) {
      console.error(`Invalid CSV headers in file ${file}`)
      return []
    }
    throw error
  }
}

module.exports = parseCsvFile
