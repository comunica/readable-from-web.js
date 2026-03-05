import { Readable, type ReadableOptions } from 'readable-stream'

/**
 * Wrapper for ReadableStream that converts it into a readable-stream Readable.
 * The implementation loosely follows the example laid out by Node's internal implementation:
 * https://github.com/nodejs/node/blob/0b676736a0e9ab4939c195a516aa7e82fcd839aa/lib/internal/webstreams/adapters.js#L512
 */
class ReadableFromWeb<T> extends Readable {
  private readonly reader: ReadableStreamDefaultReader<T>
  private readerClosed: boolean

  public constructor(stream: Readonly<ReadableStream<T>>, options?: Readonly<ReadableOptions>) {
    super(options)
    this.reader = stream.getReader()
    this.readerClosed = false
    this.reader.closed.catch((error: unknown) => {
      this.destroy(error)
    }).finally(() => {
      this.readerClosed = true
    })
  }

  public _read(): void {
    this.reader.read()
      .then((chunk: Readonly<ReadableStreamReadResult<T>>) => {
        if (chunk.done) {
          this.push(null)
        } else {
          this.push(chunk.value)
        }
      })
      .catch((error: unknown) => {
        this.destroy(error)
      })
  }

  public destroy(error: unknown): this {
    let finalError: unknown = error
    if (!this.readerClosed) {
      this.reader.cancel(error).then().catch((cancelError: unknown) => {
        finalError = cancelError
      })
    }
    if (finalError instanceof Error) {
      return super.destroy(finalError)
    }
    return super.destroy()
  }
}

const readableFromWeb = <T>(
  stream: Readonly<ReadableStream<T>>,
  options?: Readonly<ReadableOptions>
): Readable => new ReadableFromWeb<T>(stream, options)

export { ReadableFromWeb, readableFromWeb }
