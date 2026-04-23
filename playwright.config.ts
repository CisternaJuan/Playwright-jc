import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'node:path';

dotenv.config({ path: path.resolve(__dirname, '.env') });

export default defineConfig({
    testDir: './tests',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    timeout: 30_000,

    reporter: [
        ['html', { outputFolder: 'playwright-report' }],
        ['list'],
    ],
    use: {
        baseURL: process.env.BASE_URL,
        trace: 'on',
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        headless: true,
    },

    projects: process.env.DOCKER_ENV === 'true' ? [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
    ] : [
        /*{
          name: 'firefox',
          use: { ...devices['Desktop Firefox'] },
        },
        {
          name: 'Edge',
          use: { ...devices['Desktop Edge'], channel: 'msedge',},
        },*/
        {
            name: 'google chrome',
            use: { ...devices['Desktop Chrome'], channel: 'chrome',},
        },
    ],
});
