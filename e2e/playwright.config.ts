import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
dotenv.config({ path: `${__dirname}/.env`, quiet: true });

declare global {
  interface BigInt {
    toJSON(): string;
  }
}

BigInt.prototype.toJSON = function (): string {
  return this.toString();
};

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Run tests in files in parallel */
  fullyParallel: true,
  projects: [
    /* Configure projects for major browsers */
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },

    /* Test against mobile viewports. */
    // {
    //   name: "Galaxy S8",
    //   use: { ...devices["Galaxy S8"] },
    // },
  ],
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [["html", { open: process.env.CI ? "never" : "on-failure" }]],
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  testDir: "./src/tests",

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    actionTimeout: 5000,
    baseURL: process.env.DEMOQA,
    screenshot: {
      fullPage: true,
      mode: "only-on-failure",
    },
    trace: "on-first-retry",
    video: "on-first-retry",
  },

  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
});
