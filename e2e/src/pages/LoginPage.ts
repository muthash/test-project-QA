import { expect, Locator, Page } from "@playwright/test";

export default class LoginPage {
  readonly invalidLoginError: Locator;
  readonly page: Page;
  readonly pageTitle: Locator;
  readonly passwordInput: Locator;
  readonly passwordInputError: Locator;
  readonly signupButton: Locator;
  readonly submitButton: Locator;
  readonly usernameInput: Locator;
  readonly usernameInputError: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle = page.getByRole("heading", { exact: true, name: "Login" });
    this.usernameInput = page.getByPlaceholder("UserName");
    this.passwordInput = page.getByPlaceholder("Password");
    this.submitButton = page.getByRole("button", { name: "Login" });
    this.signupButton = page.getByRole("button", { name: "New User" });
    this.usernameInputError = this.page.locator("input#userName.is-invalid");
    this.passwordInputError = this.page.locator("input#password.is-invalid");
    this.invalidLoginError = this.page.getByText("Invalid username or password!");
  }

  public async assertLoginPage() {
    await expect(this.page).toHaveURL("/login");
  }

  public async clickSignupButton() {
    await this.signupButton.dispatchEvent("click");
  }

  public async fillLoginForm(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
  }

  public async goto() {
    await this.page.goto("/login");
  }

  public async submitLogin() {
    await this.submitButton.dispatchEvent("click");
  }
}
