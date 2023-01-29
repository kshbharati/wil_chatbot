import { test, expect } from "@playwright/test";
import { API_URI } from "../constants";

/**
 * @testcase TS11
 * @testcase Description
 * @relates Relation
 * 
 */
test("Dialogflow visible in Home Page", async ({ page }) => {
    await page.goto(API_URI);
    await expect(page.locator("div#chatbot #widgetIcon")).toBeVisible();
});

test("Dialogflow visible in Property Page", async ({ page }) => {
    await page.goto(API_URI + "/property");
    await expect(page.locator("div#chatbot #widgetIcon")).toBeVisible();
    await expect(page.locator("df-messenger-user-input")).toBeHidden();
});

test("Dialogflow visible in Agent Page", async ({ page }) => {

    await page.goto(API_URI + "/agent");
    await expect(page.locator("div#chatbot #widgetIcon")).toBeVisible();
    await expect(page.locator("df-messenger-user-input")).toBeHidden();
});

test("Dialogflow visible in Privacy Page", async ({ page }) => {
    await page.goto(API_URI + "/privacy");
    await expect(page.locator("div#chatbot #widgetIcon")).toBeVisible();
    await expect(page.locator("df-messenger-user-input")).toBeHidden();
});

test("Dialogflow visible in Sitemap page", async ({ page }) => {
    await page.goto(API_URI+"/sitemap");
    await expect(page.locator("div#chatbot #widgetIcon")).toBeVisible();
    await expect(page.locator("df-messenger-user-input")).toBeHidden();
});

