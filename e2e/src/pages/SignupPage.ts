import { expect, Locator, Page } from "@playwright/test";

export default class SignupPage {
  readonly firstnameInput: Locator;
  readonly lastnameInput: Locator;
  readonly loginButton: Locator;
  readonly page: Page;
  readonly pageTitle: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly usernameInput: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle = page.getByRole("heading", { exact: true, name: "Register" });
    this.firstnameInput = page.locator("#firstname");
    this.lastnameInput = page.locator("#lastname");
    this.usernameInput = page.getByPlaceholder("UserName");
    this.passwordInput = page.getByPlaceholder("Password");
    this.submitButton = page.getByRole("button", { name: "Register" });
    this.loginButton = page.getByRole("button", { name: "Back to Login" });
  }

  public async assertRegisterPage() {
    await expect(this.page).toHaveURL("/register");
  }

  public async checkCaptchaCheckbox() {
    const frame = this.page.frameLocator('iframe[title="reCAPTCHA"]');
    const checkbox = frame.locator(".recaptcha-checkbox-border");
    await checkbox.dispatchEvent("click");
  }

  public async clickLoginButton() {
    await this.loginButton.dispatchEvent("click");
  }

  public async fillRegisterForm(firstname: string, lastname: string, username: string, password: string) {
    await this.firstnameInput.fill(firstname);
    await this.lastnameInput.fill(lastname);
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
  }

  public async goto() {
    await this.page.goto("/register");
  }

  public async submitRegister() {
    await this.submitButton.dispatchEvent("click");
  }
}
