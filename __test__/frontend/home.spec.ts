import { test, expect } from "@playwright/test";

/**
 * @testcase TS11
 * @testcase Description
 * @relates Relation
 * 
 */
test("home page as Agent", async ({ page }) => {
    await page.goto("http://localhost:3000");
    await expect(page.locator("div.propertyListing>p")).toContainText("Property Listing");
});
