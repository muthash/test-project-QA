import { test as base } from "@playwright/test";
import { WebTablePage } from "../pages/WebTablesPage";

type WebTableFixtures = {
  tablePage: WebTablePage;
};

export const webTableTest = base.extend<WebTableFixtures>({
  tablePage: async ({ page }, use) => {
    const tablePage = new WebTablePage(page);
    await tablePage.goto();
    await use(tablePage);
  },
});

export { expect } from "@playwright/test";
