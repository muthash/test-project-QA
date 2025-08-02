import { expect, Locator, Page } from "@playwright/test";

import { WebTableModal } from "./WebTableModal";

export class WebTablePage {
  readonly addButton: Locator;
  readonly headers: Locator;
  readonly modal: WebTableModal;
  readonly page: Page;
  readonly rows: Locator;
  readonly searchBox: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addButton = page.locator("#addNewRecordButton");
    this.searchBox = page.locator("#searchBox");
    this.headers = page.locator(".rt-thead .rt-resizable-header-content");
    this.rows = page.locator(".rt-tbody .rt-tr-group");
    this.modal = new WebTableModal(page);
  }

  public async clearSearch() {
    await this.searchBox.fill("");
  }

  public async clickAddButton() {
    await this.addButton.click();
  }

  public async deleteRowByIndex(index: number) {
    await this.rows.nth(index).locator('[title="Delete"]').click();
  }

  public async editRowByIndex(index: number) {
    await this.rows.nth(index).locator('[title="Edit"]').click();
    await this.modal.waitForVisible();
  }

  public async getCellValue(value: string) {
    return (await this.page.getByRole("gridcell", { name: value }).first().textContent()) ?? "";
  }

  /**
   * Returns only rows that have data (i.e. first cell is not empty),
   * and maps them to their original DOM index.
   */
  public async getDataRowsOnly(): Promise<{ data: Record<number, string[]>; total: number }> {
    const totalRows = await this.getRowCount();
    const data: Record<number, string[]> = {};

    for (let rowIndex = 0; rowIndex < totalRows; rowIndex++) {
      const cells = this.rows.nth(rowIndex).locator(".rt-td");
      const cellCount = await cells.count();

      if (cellCount === 0) continue;

      const firstCell = (await cells.nth(0).innerText()).trim();
      if (!firstCell) continue; // skip row if first cell is empty

      const rowData: string[] = [firstCell];
      for (let cellIndex = 1; cellIndex < cellCount; cellIndex++) {
        const value = (await cells.nth(cellIndex).innerText()).trim();
        rowData.push(value);
      }

      data[rowIndex] = rowData;
    }

    return {
      data,
      total: Object.keys(data).length,
    };
  }

  public async getRowCount(): Promise<number> {
    return this.rows.count();
  }

  public async getTotalRowsWithData(): Promise<number> {
    const totalRows = await this.rows.all();
    let totalRowsWithData = 0;

    for (const row of totalRows) {
      const firstCell = row.locator(".rt-td").first();
      const text = (await firstCell.textContent())?.trim();

      if (text) {
        totalRowsWithData++;
      }
    }

    return totalRowsWithData;
  }

  public async goto() {
    await this.page.goto("/webtables");
    await expect(this.page).toHaveURL("/webtables");
  }

  public async openAddForm() {
    await this.addButton.click();
    await this.modal.waitForVisible();
  }

  public async search(value: string) {
    await this.searchBox.fill(value);
  }
}
