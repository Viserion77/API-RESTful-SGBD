// @ts-check

const { CSV_SEPARATOR } = require("./constants")
const validateCsvHeaders = require("./validateCsvHeaders")

/**
 * Parse the movie data from the CSV content
 * @param {string} content 
 * @returns {Object[]}
 * @example
 * parseMovieData('year;title;studios;producers;winner\n200;Movie Title;Studio;Producer;yes')
 */
function parseMovieData(content) {
  const lines = content.split('\n')

  const headers = lines.shift()?.split(CSV_SEPARATOR) ?? []
  validateCsvHeaders(headers)

  return lines.map(line => {
    const [year, title, studios, producers, winner] = line.split(CSV_SEPARATOR)

    return {
      year: parseInt(year),
      title,
      studios,
      producers,
      winner: winner === 'yes'
    }
  })
}

module.exports = parseMovieData
