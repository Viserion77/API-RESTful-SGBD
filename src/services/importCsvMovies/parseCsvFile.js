// @ts-check

import fs from 'node:fs/promises'
import { INVALID_CSV_HEADERS, TO_SCAN_DIRECTORY } from './constants.js'
import parseMovieData from './parseMovieData.js'

/**
 * Parse a CSV file and return the movie list
 * @param {string} file
 * @returns {Promise<Object[]>}
 * @example
 * parseCsvFile('movies.csv')
 */
export default async function parseCsvFile(file) {
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
