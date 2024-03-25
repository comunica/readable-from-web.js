import { defineConfig } from '@playwright/test';

export default defineConfig({
  testMatch: /test\/?(.+)+browser\.[tj]s$/u,
  reporter: process.env.CI ? 'github' : 'list',
  preserveOutput: 'never',
  webServer: {
    command: 'yarn webpack-dev-server',
    url: 'http://localhost:4000/',
    reuseExistingServer: !process.env.CI,
    stdout: 'ignore',
    stderr: 'pipe',
  },
});
