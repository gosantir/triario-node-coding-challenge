import { Readable, Transform } from 'node:stream'

const source = Readable.from('hello from node.js')

function createUppercaseTransform() {
  return new Transform({
    transform(chunk, encoding, callback) {
      try {
        const uppercased = chunk.toString().toUpperCase()
        this.push(uppercased)
        callback()
      } catch (error) {
        callback(error)
      }
    },
  })
}

const uppercaseTransform = createUppercaseTransform()

source
  .pipe(uppercaseTransform)
  .pipe(process.stdout)