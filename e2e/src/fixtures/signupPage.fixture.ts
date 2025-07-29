import { test as base } from "@playwright/test";

import SignupPage from "../pages/SignupPage";

type SignupFixtures = {
  signupPage: SignupPage;
};

export const signupTest = base.extend<SignupFixtures>({
  signupPage: async ({ page }, use) => {
    const signupPage = new SignupPage(page);
    await signupPage.goto();
    await use(signupPage);
    await signupPage.page.close();
  },
});

export { devices, expect } from "@playwright/test";
