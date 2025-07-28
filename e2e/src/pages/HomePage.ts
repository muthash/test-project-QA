import { expect, type Page, type Locator } from "@playwright/test";

export default class HomePage {
  readonly page: Page;
  readonly elements: Locator;
  readonly forms: Locator;
  readonly alerts: Locator;
  readonly widgets: Locator;
  readonly interactions: Locator;
  readonly bookStore: Locator;

  constructor(page: Page) {
    this.page = page;
    this.elements = page.getByRole("heading", { name: "Elements" });
    this.forms = page.getByRole("heading", { name: "Forms" });
    this.alerts = page.getByRole("heading", { name: "Alerts, Frame & Windows" });
    this.widgets = page.getByRole("heading", { name: "Widgets" });
    this.interactions = page.getByRole("heading", { name: "Interactions" });
    this.bookStore = page.getByRole("heading", { name: "Book Store Application" });
  }

  public async goto() {
    await this.page.goto("/");
  }

  public async assertCurrentPage() {
    await expect(this.page).toHaveURL("/");
  }

  public async clickElements() {
    await this.elements.click();
  }

  public async clickForms() {
    await this.forms.click();
  }

  public async clickAlerts() {
    await this.alerts.click();
  }

  public async clickWidgets() {
    await this.widgets.click();
  }

  public async clickInteractions() {
    await this.interactions.click();
  }

  public async clickBookStore() {
    await this.bookStore.click();
  }
}
