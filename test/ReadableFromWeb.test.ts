/* eslint-disable @typescript-eslint/no-require-imports */

import { expect, test } from 'vitest'
import type { Readable } from 'readable-stream'
import { readableFromWeb } from '..'

// Helper types for linting in the tests
type ReadableToWeb = (stream: Readonly<Readable>) => ReadableStream;
type StreamToString = (stream: Readonly<Readable>) => Promise<string>;
type StringToStream = (string: string) => Readable;

const readableToWeb = require('readable-stream-node-to-web') as ReadableToWeb
const streamToString = require('stream-to-string') as StreamToString
const stringToStream = require('streamify-string') as StringToStream

test('should handle conversion', async() => {
  const originalStream = stringToStream('abc')
  const whatwgStream = readableToWeb(originalStream)
  const readableStreamReadable = readableFromWeb(whatwgStream)
  await expect(streamToString(readableStreamReadable)).resolves.toBe('abc')
})


test('should forward errors from the whatwg stream', async() => {
  const expectedError: Error = new Error('Expected error')
  const originalStream = stringToStream('abc')
  // eslint-disable-next-line no-underscore-dangle
  originalStream._read = (): void => {
    throw expectedError
  }
  const whatwgStream = readableToWeb(originalStream)
  const readableStreamReadable = readableFromWeb(whatwgStream)
  await expect(streamToString(readableStreamReadable)).rejects.toBe(expectedError)
})

test('should allow destroying while reading', async() => {
  const expectedError: Error = new Error('Expected error')
  const originalStream = stringToStream('abc')
  const whatwgStream = readableToWeb(originalStream)
  const readableStreamReadable = readableFromWeb(whatwgStream)
  // eslint-disable-next-line no-underscore-dangle
  originalStream._read = (): void => {
    readableStreamReadable.destroy(expectedError)
  }
  await expect(streamToString(readableStreamReadable)).rejects.toBe(expectedError)
})
