import { type PlaywrightTestConfig, devices } from "@playwright/test";

const config: PlaywrightTestConfig = {
    testDir:'__test__/frontend',
    retries:2,
    timeout:30000,
    webServer:{
        command:'yarn dev',
        url:'http://localhost:3000/',
        timeout:120 * 1000,
        reuseExistingServer: !process.env.CI,
    },
    use:{
        baseURL:'http://localhost:3000/',
        screenshot:'only-on-failure',
        trace:'retain-on-failure'
    },
    projects: [
        {
            name: "chromium",
            use: { ...devices["Desktop Chrome"] },
        },
        {
            name: "firefox",
            use: { ...devices["Desktop Firefox"] },
        },
        {
            name: "webkit",
            use: { ...devices["Desktop Safari"] },
        },
    ],
};
export default config;
