import { compilerOptions } from './tsconfig.build.json'
import { defineConfig } from 'vitest/config'
import { playwright } from '@vitest/browser-playwright'

const browsers: ('chromium' | 'firefox' | 'webkit')[] = [
  'chromium',
  'firefox',
  'webkit'
]

export default defineConfig({
  build: {
    minify: false,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    target: compilerOptions.target
  },
  test: {
    projects: [
      ...browsers.map(browser => ({
        test: {
          browser: {
            enabled: true,
            headless: true,
            instances: [
              { browser }
            ],
            provider: playwright({ actionTimeout: 1_000 }),
            screenshotFailures: false
          },
          name: browser
        }
      })),
      {
        test: {
          environment: 'node',
          name: 'node'
        }
      }
    ]
  }
})
