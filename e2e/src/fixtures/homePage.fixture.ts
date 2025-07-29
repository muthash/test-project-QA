import { test as base } from "@playwright/test";

import HomePage from "../pages/HomePage";

type HomeFixtures = {
  homePage: HomePage;
};

export const homeTest = base.extend<HomeFixtures>({
  homePage: async ({ page }, use) => {
    // Set up the fixture.
    const homePage = new HomePage(page);
    await homePage.goto();

    // Use the fixture value in the test.
    await use(homePage);

    // Clean up the fixture.
    await homePage.page.close();
  },
});

export { expect } from "@playwright/test";
