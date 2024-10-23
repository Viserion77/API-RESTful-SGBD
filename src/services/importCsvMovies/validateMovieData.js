/**
 * Validate the data of a movie
 * @param {string} year
 * @param {string} title
 * @param {string} studios
 * @param {string} producers
 * @param {string} winner
 * @returns {string | undefined}
 * @example
 * validateMovieData('200', 'Movie Title', 'Studio', 'Producer', 'yes')
 */
export default function validateMovieData(year, title, studios, producers, winner) {
  if (isNaN(parseInt(year))) {
    return 'Invalid year'
  }

  if (!title) {
    return 'Invalid title'
  }

  if (!studios) {
    return 'Invalid studios'
  }

  if (!producers) {
    return 'Invalid producers'
  }

  if (winner !== 'yes' && winner !== 'no' && winner !== '') {
    return 'Invalid winner'
  }
}