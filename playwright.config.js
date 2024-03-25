import { defineConfig } from '@playwright/test';

export default defineConfig({
  testMatch: 'test/*-spec.ts',
  reporter: process.env.CI ? 'github' : 'list',
  preserveOutput: 'never',
  webServer: {
    command: 'yarn webpack-dev-server',
    url: 'http://127.0.0.1:4000',
    reuseExistingServer: !process.env.CI,
    stdout: 'ignore',
    stderr: 'pipe',
  },
});