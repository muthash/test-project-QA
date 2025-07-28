import { expect, devices, loginTest as test } from "../fixtures/loginPage.fixture";

test.use({ ...devices["Galaxy S8"] });

test.describe("Login Page Layout Tests", () => {
  test("should display login page title", async ({ loginPage }) => {
    await expect(loginPage.pageTitle).toBeVisible();
    await expect(loginPage.pageTitle).toHaveText("Login");
    await expect(loginPage.page.getByRole("heading", { name: "Welcome" })).toBeVisible();
  });

  test("should display username and password fields", async ({ loginPage }) => {
    await expect(loginPage.usernameInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
  });

  test("should display login and signup buttons", async ({ loginPage }) => {
    await expect(loginPage.submitButton).toBeVisible();
    await expect(loginPage.signupButton).toBeVisible();
  });

  test("should navigate to signup page when 'New User' button is clicked", async ({ loginPage, page }) => {
    await loginPage.clickSignupButton();
    await expect(page).toHaveURL("/register");
  });
});

test.describe("Login functionality", () => {
  test("should not login with empty fields", async ({ loginPage }) => {
    await loginPage.usernameInput.fill("");
    await loginPage.passwordInput.fill("");
    await loginPage.submitLogin();
    await expect(loginPage.usernameInputError).toBeVisible();
    await expect(loginPage.usernameInputError).toHaveClass(/is-invalid/);
    await expect(loginPage.passwordInputError).toBeVisible();
    await expect(loginPage.passwordInputError).toHaveClass(/is-invalid/);
  });

  test("should not login with empty username", async ({ loginPage }) => {
    await loginPage.usernameInput.fill("");
    await loginPage.passwordInput.fill("validPassword");
    await loginPage.submitLogin();
    await expect(loginPage.usernameInputError).toBeVisible();
    await expect(loginPage.usernameInputError).toHaveClass(/is-invalid/);
    await expect(loginPage.passwordInputError).not.toBeVisible();
  });

  test("should not login with empty password", async ({ loginPage }) => {
    await loginPage.usernameInput.fill("validUsername");
    await loginPage.passwordInput.fill("");
    await loginPage.submitLogin();
    await expect(loginPage.passwordInputError).toBeVisible();
    await expect(loginPage.passwordInputError).toHaveClass(/is-invalid/);
    await expect(loginPage.usernameInputError).not.toBeVisible();
  });

  test("should not login with invalid credentials", async ({ loginPage }) => {
    await loginPage.usernameInput.fill("invalidUser");
    await loginPage.passwordInput.fill("invalidPassword");
    await loginPage.submitLogin();
    await expect(loginPage.invalidLoginError).toBeVisible();
    await expect(loginPage.invalidLoginError).toHaveText("Invalid username or password!");
  });

  //   // test("should create a user and login successfully", async ({ page }) => {
  //   //   // Go to registration page
  //   //   await page.goto("https://demoqa.com/register");
  //   //   const randomUser = `user${Math.floor(Math.random() * 100000)}`;
  //   //   const password = "Password123!";
  //   //   await page.fill("#firstname", "Test");
  //   //   await page.fill("#lastname", "User");
  //   //   await page.fill("#userName", randomUser);
  //   //   await page.fill("#password", password);
  //   //   // CAPTCHA cannot be automated, so this step is manual or skipped in CI
  //   //   // await page.click('#register');
  //   //   // await expect(page.locator('.text-success')).toHaveText('User Register Successfully.');
  //   //   // For demonstration, try to login with the new user (if registration is possible)
  //   //   await page.goto(baseURL);
  //   //   await page.fill("#userName", randomUser);
  //   //   await page.fill("#password", password);
  //   //   await page.click("#login");
  //   //   await expect(page).toHaveURL(/profile/);
  //   //   await expect(page.locator("#userName-value")).toHaveText(randomUser);
  //   // });
});
