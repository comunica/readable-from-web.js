import { expect, test } from 'vitest';
import { Readable } from 'readable-stream';
import { readableFromWeb } from '../lib/ReadableFromWeb';

import readableToWeb from 'readable-stream-node-to-web';
import streamToString from 'stream-to-string';

test('should handle conversion', async () => {
  const originalStream = Readable.from('abc');
  const whatwgStream = readableToWeb(originalStream);
  const readableStreamReadable = readableFromWeb(whatwgStream);
  await expect(streamToString(readableStreamReadable)).resolves.toBe('abc');
});

test('should forward errors from the whatwg stream', async () => {
  const expectedError: Error = new Error('Expected error');
  const originalStream = Readable.from('abc');

  originalStream._read = (): void => {
    throw expectedError;
  };
  const whatwgStream = readableToWeb(originalStream);
  const readableStreamReadable = readableFromWeb(whatwgStream);
  await expect(streamToString(readableStreamReadable)).rejects.toBe(expectedError);
});

test('should allow destroying while reading', async () => {
  const expectedError: Error = new Error('Expected error');
  const originalStream = Readable.from('abc');
  const whatwgStream = readableToWeb(originalStream);
  const readableStreamReadable = readableFromWeb(whatwgStream);

  originalStream._read = (): void => {
    readableStreamReadable.destroy(expectedError);
  };
  await expect(streamToString(readableStreamReadable)).rejects.toBe(expectedError);
});
