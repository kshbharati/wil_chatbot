import { type PlaywrightTestConfig, devices } from "@playwright/test";
import { API_URI } from "./constants";

const config: PlaywrightTestConfig = {
    testDir:'tests',
    retries:2,
    timeout:30000,
    webServer:{
        command:'yarn dev',
        url:API_URI,
        timeout:120 * 1000,
        reuseExistingServer: !process.env.CI,
    },
    use:{
        baseURL:API_URI,
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
