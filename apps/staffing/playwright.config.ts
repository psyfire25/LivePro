import { defineConfig, devices } from '@playwright/test';
import baseConfig from '@repo/test-config/playwright.config.ts';

export default defineConfig({
    ...baseConfig,
    testDir: './e2e',
    use: {
        ...baseConfig.use,
        baseURL: 'http://localhost:3030',
    },
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
    ],
    webServer: {
        command: 'pnpm dev',
        port: 3030,
        reuseExistingServer: !process.env.CI,
    },
});
