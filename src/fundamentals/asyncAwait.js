function asyncAwaitOperation(delay) {
  return new Promise((resolve, reject) => {

    if (typeof delay !== 'number' || delay > 5000) {
      return reject(new Error('Too long timer'), null)
    }

    setTimeout(() => {
      resolve(`Completed after ${delay}ms.`)
    }, delay)
  })
}



(async () => {

  // Example 1: Successful async operation
  try {
    const result = await asyncAwaitOperation(1000)
    console.log('[Async/Await] Result:', result)
  } catch (error) {
    console.error('[Async/Await] Error:', error.message)
  }

  try {
    const result = await asyncAwaitOperation(2000)
    console.log('[Async/Await] Result:', result)
  } catch (error) {
    console.error('[Async/Await] Error:', error.message)
  }

  // Example 2: Error handling with invalid input
  try {
    const result = await asyncAwaitOperation(5001)
  } catch (error) {
    console.error('[Async/Await] Error caught:', error.message)
  }

  console.log('Finished')


})()

export { asyncAwaitOperation }