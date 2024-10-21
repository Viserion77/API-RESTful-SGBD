// @ts-check

const fs = require('fs').promises
const { TO_SCAN_DIRECTORY } = require('./constants')

/**
 * Get CSV files from the directory
 * @returns {Promise<string[]>}
 * @example
 * getCsvFiles()
 */
async function getCsvFiles() {
  const files = await fs.readdir(TO_SCAN_DIRECTORY)
  const csvFiles = files.filter(file => file.endsWith('.csv'))
  return csvFiles
}

module.exports = getCsvFiles
