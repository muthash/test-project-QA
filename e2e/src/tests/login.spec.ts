import { devices, expect, loginTest as test } from "../fixtures/loginPage.fixture";

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

test.describe("Login functionality", { tag: ["@login, @regression"] }, () => {
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
    await expect(loginPage.passwordInputError).toBeHidden();
  });

  test("should not login with empty password", async ({ loginPage }) => {
    await loginPage.usernameInput.fill("validUsername");
    await loginPage.passwordInput.fill("");
    await loginPage.submitLogin();
    await expect(loginPage.passwordInputError).toBeVisible();
    await expect(loginPage.passwordInputError).toHaveClass(/is-invalid/);
    await expect(loginPage.usernameInputError).toBeHidden();
  });

  test("should not login with invalid credentials", async ({ loginPage }) => {
    await loginPage.usernameInput.fill("invalidUser");
    await loginPage.passwordInput.fill("invalidPassword");
    await loginPage.submitLogin();
    await expect(loginPage.invalidLoginError).toBeVisible();
    await expect(loginPage.invalidLoginError).toHaveText("Invalid username or password!");
  });

  test(
    "should create a user and login successfully",
    { tag: "@sanity" },
    async ({ createAccount: testAccount, deleteAccount, generateToken: generateToken, loginPage, page }) => {
      // Create a new user account using API
      const { password, userID, username } = testAccount;

      // Fill login form with the new user credentials
      await loginPage.fillLoginForm(username, password);
      await loginPage.submitLogin();

      // Validate successful login
      await expect(page).toHaveURL("/profile");
      await expect(page.getByText(username)).toBeVisible();
      await expect(page.locator("#userName-value")).toHaveText(username);

      // cleanup manually
      const { token } = await generateToken(username, password);
      await deleteAccount(userID, token);
    },
  );
});
