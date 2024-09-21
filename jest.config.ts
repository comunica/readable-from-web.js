import type { Config } from 'jest';

const config: Config = {
  collectCoverage: true,
  preset: 'ts-jest/presets/default',
  testMatch: [ '<rootDir>/test/*-test.ts' ],
  testEnvironment: 'node',
};

export default config;
