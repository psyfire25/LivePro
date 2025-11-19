import { defineConfig, devices } from '@playwright/test';
import baseConfig from '@repo/test-config/playwright.config';

export default defineConfig({
    ...baseConfig,
    testDir: './e2e',
    use: {
        ...baseConfig.use,
        baseURL: 'http://localhost:3020',
    },
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
    ],
    webServer: {
        command: 'pnpm dev',
        port: 3020,
        reuseExistingServer: !process.env.CI,
    },
});
