
function sumArray(numbers) {
  if (!Array.isArray(numbers)) {
    throw new Error('Input must be an array')
  }

  return numbers.reduce((accumulator, current, index) => {
    if (typeof current !== 'number' || Number.isNaN(current)) {
      throw new Error(`Invalid value`)
    }
    return accumulator + current
  }, 0)
}

module.exports = {
  sumArray
}
