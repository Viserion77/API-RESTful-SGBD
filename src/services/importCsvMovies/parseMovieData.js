// @ts-check

import { CSV_SEPARATOR } from "./constants.js"
import validateCsvHeaders from "./validateCsvHeaders.js"

/**
 * Parse the movie data from the CSV content
 * @param {string} content 
 * @returns {Object[]}
 * @example
 * parseMovieData('year;title;studios;producers;winner\n200;Movie Title;Studio;Producer;yes')
 */
export default function parseMovieData(content) {
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
