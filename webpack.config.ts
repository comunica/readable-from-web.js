import { resolve } from 'node:path';
import type { WebpackConfiguration } from 'webpack-dev-server';

const config: WebpackConfiguration = {
  devServer: {
    port: 4000,
    host: 'localhost',
    static: resolve(__dirname),
  },
  entry: {
    index: './lib/index.ts',
    streamtostring: 'stream-to-string',
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.ts$/u,
        use: 'ts-loader',
        exclude: /node_modules/u,
      },
    ],
  },
  resolve: {
    extensions: [ '.ts', '.js' ],
  },
  output: {
    library: '[name]',
    filename: '[name].js',
    path: resolve(__dirname, 'dist'),
  },
};

export default config;
