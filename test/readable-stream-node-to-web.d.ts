declare module 'readable-stream-node-to-web' {
  function readableToWeb(nodeStream: NodeJS.ReadableStream): ReadableStream;
  export default readableToWeb;
}
