import { test, expect } from "@playwright/test";
import { API_URI } from "../constants";

test("Carousel Visible", async ({ page }) => {
    await page.goto(API_URI);
    await page.waitForLoadState();
    await expect(page.locator("div.carousel-slider")).toBeVisible();
});
