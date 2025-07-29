import { expect, type Locator, type Page } from "@playwright/test";

export default class HomePage {
  readonly alerts: Locator;
  readonly bookStore: Locator;
  readonly elements: Locator;
  readonly forms: Locator;
  readonly interactions: Locator;
  readonly page: Page;
  readonly widgets: Locator;

  constructor(page: Page) {
    this.page = page;
    this.elements = page.getByRole("heading", { name: "Elements" });
    this.forms = page.getByRole("heading", { name: "Forms" });
    this.alerts = page.getByRole("heading", { name: "Alerts, Frame & Windows" });
    this.widgets = page.getByRole("heading", { name: "Widgets" });
    this.interactions = page.getByRole("heading", { name: "Interactions" });
    this.bookStore = page.getByRole("heading", { name: "Book Store Application" });
  }

  public async assertCurrentPage() {
    await expect(this.page).toHaveURL("/");
  }

  public async clickAlerts() {
    await this.alerts.click();
  }

  public async clickBookStore() {
    await this.bookStore.click();
  }

  public async clickElements() {
    await this.elements.click();
  }

  public async clickForms() {
    await this.forms.click();
  }

  public async clickInteractions() {
    await this.interactions.click();
  }

  public async clickWidgets() {
    await this.widgets.click();
  }

  public async goto() {
    await this.page.goto("/");
  }
}
