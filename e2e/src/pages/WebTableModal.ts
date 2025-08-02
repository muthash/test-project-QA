import { Locator, Page } from "@playwright/test";

export class WebTableModal {
  readonly age: Locator;
  readonly closeButton: Locator;
  readonly department: Locator;
  readonly email: Locator;
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly modal: Locator;
  readonly modalTitle: Locator;
  readonly page: Page;
  readonly salary: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.modal = page.locator(".modal-content");
    this.modalTitle = page.locator("#registration-form-modal");
    this.firstName = page.locator("#firstName");
    this.lastName = page.locator("#lastName");
    this.email = page.locator("#userEmail");
    this.age = page.locator("#age");
    this.salary = page.locator("#salary");
    this.department = page.locator("#department");
    this.submitButton = page.locator("#submit");
    this.closeButton = page.locator(".close");
  }

  public async close() {
    await this.closeButton.click();
  }

  public async editForm(data: {
    age?: string;
    department?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    salary?: string;
  }) {
    const fields: [keyof typeof data, Locator][] = [
      ["firstName", this.firstName],
      ["lastName", this.lastName],
      ["email", this.email],
      ["age", this.age],
      ["salary", this.salary],
      ["department", this.department],
    ];

    for (const [key, field] of fields) {
      const value = data[key];
      if (value !== undefined) {
        await field.fill("");
        await field.fill(value);
      }
    }
  }

  public async fillForm(data: { age: string; department: string; email: string; firstName: string; lastName: string; salary: string }) {
    await this.firstName.fill(data.firstName);
    await this.lastName.fill(data.lastName);
    await this.email.fill(data.email);
    await this.age.fill(data.age);
    await this.salary.fill(data.salary);
    await this.department.fill(data.department);
  }

  public async submitForm() {
    await this.submitButton.click();
  }

  async waitForVisible() {
    await this.modal.waitFor({ state: "visible" });
  }
}
