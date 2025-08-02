import { test as base } from "@playwright/test";

import { deleteUser, generateToken, registerUser } from "../api/userApi";
import LoginPage from "../pages/LoginPage";

type TestAccountDetails = {
  password: string;
  userID: string;
  username: string;
};

type createAccountResponse = {
  books: string[];
  userID: string;
  username: string;
};

type GenerateTokenResponse = {
  expires: string;
  result: string;
  status: string;
  token: string;
};

type LoginFixtures = {
  createAccount: TestAccountDetails;
  deleteAccount: (userID: string, token: string) => Promise<void>;
  generateToken: (username: string, password: string) => Promise<GenerateTokenResponse>;
  loginPage: LoginPage;
};

export const loginTest = base.extend<LoginFixtures>({
  createAccount: async ({ request }, use, testInfo) => {
    const uniqueSuffix = `${Date.now()}_${Math.floor(Math.random() * 10000)}`;
    const defaultUsername = `user_${uniqueSuffix}`;
    const password = process.env.PASSWORD ?? "Test@12345";

    // Allow manual override via testInfo annotations
    const usernameOverride = testInfo.annotations.find((a) => a.type === "username")?.description;
    const username = usernameOverride ?? defaultUsername;

    // Create account via API
    const response = await registerUser(request, username, password);
    if (response.status() !== 201) {
      throw new Error(`Account creation failed: ${await response.text()}`);
    }

    const { userID } = (await response.json()) as createAccountResponse;
    if (!userID) {
      throw new Error("User ID not found in account creation response");
    }

    const testAccount: TestAccountDetails = {
      password,
      userID,
      username,
    };
    await use(testAccount);
  },

  deleteAccount: async ({ request }, use) => {
    await use(async (userID: string, token: string) => {
      const response = await deleteUser(request, userID, token);
      if (response.status() !== 204) {
        console.error(`Account deletion failed: ${await response.text()}`);
      }
    });
  },

  generateToken: async ({ request }, use) => {
    await use(async (username: string, password: string) => {
      const response = await generateToken(request, username, password);
      if (response.status() !== 200) {
        console.error(`Token generation failed: ${await response.text()}`);
      }
      return (await response.json()) as GenerateTokenResponse;
    });
  },

  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await use(loginPage);
  },
});

export { devices, expect } from "@playwright/test";
