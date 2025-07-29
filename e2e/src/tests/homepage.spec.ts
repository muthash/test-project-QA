import { expect, homeTest as test } from "../fixtures/homePage.fixture";

test.describe("Homepage Navigation Tests", () => {
  test("should navigate to Elements page", async ({ homePage, page }) => {
    await homePage.clickElements();
    await expect(page).toHaveURL("/elements");
  });

  test("should navigate to Forms page", async ({ homePage, page }) => {
    await homePage.clickForms();
    await expect(page).toHaveURL("/forms");
  });

  test("should navigate to Alerts page", async ({ homePage, page }) => {
    await homePage.clickAlerts();
    await expect(page).toHaveURL("/alertsWindows");
  });

  test("should navigate to Widgets page", async ({ homePage, page }) => {
    await homePage.clickWidgets();
    await expect(page).toHaveURL("/widgets");
  });

  test("should navigate to Interactions page", async ({ homePage, page }) => {
    await homePage.clickInteractions();
    await expect(page).toHaveURL("/interaction");
  });

  test("should navigate to Book Store page", async ({ homePage, page }) => {
    await homePage.clickBookStore();
    await expect(page).toHaveURL("/books");
  });
});
