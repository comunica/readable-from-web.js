import { defineConfig } from 'vitest/config'
import { playwright } from '@vitest/browser-playwright'

const browsers: ('chromium' | 'firefox' | 'webkit')[] = [
  'chromium',
  'firefox',
  'webkit'
]

export default defineConfig({
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
