function asyncCallbackOperation(delay, callback) {
  if (typeof delay !== 'number' || delay > 5000) {
    return callback(new Error('Too long timer'), null)
  }
  setTimeout(() => {
    const result = `Completed after ${delay}ms.`
    callback(null, result)
  }, delay)
}


console.log('\n=== CALLBACKS ===\n')

// Example 1: setTimeout-based async operation
asyncCallbackOperation(1000, (error, result) => {
  if (error) {
    console.error('[Callback] Error:', error.message)
  } else {
    console.log('[Callback] Result:', result)
  }
})

// Example 2: Invalid input
asyncCallbackOperation(5001, (error, result) => {
  if (error) {
    console.error('[Callback] Error caught:', error.message)
  } else {
    console.log('[Callback] Result:', result)
  }
})

asyncCallbackOperation(2000, (error, result) => {
  if (error) {
    console.error('[Callback] Error caught:', error.message)
  } else {
    console.log('[Callback] Result:', result)
  }
})



export { asyncCallbackOperation as simulateAsyncOperation }
