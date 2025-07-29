import { Locator, Page } from "@playwright/test";

export class WebTableModal {
  readonly page: Page;
  readonly modal: Locator;
  readonly modalTitle: Locator;
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly email: Locator;
  readonly age: Locator;
  readonly salary: Locator;
  readonly department: Locator;
  readonly submitButton: Locator;
  readonly closeButton: Locator;

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

  public async fillForm(data: { firstName: string; lastName: string; email: string; age: string; salary: string; department: string }) {
    await this.firstName.fill(data.firstName);
    await this.lastName.fill(data.lastName);
    await this.email.fill(data.email);
    await this.age.fill(data.age);
    await this.salary.fill(data.salary);
    await this.department.fill(data.department);
  }

  public async editForm(data: {
    firstName?: string;
    lastName?: string;
    email?: string;
    age?: string;
    salary?: string;
    department?: string;
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

  public async submitForm() {
    await this.submitButton.click();
  }

  public async close() {
    await this.closeButton.click();
  }

  async waitForVisible() {
    await this.modal.waitFor({ state: "visible" });
  }
}
