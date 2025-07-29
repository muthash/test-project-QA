import { expect, webTableTest as test } from "../fixtures/webTablesPage.fixture";
import { generateUser } from "../test-data/webTables.data";

test.describe("Web Table Functionality Tests", () => {
  test("Add record and verify data is saved", async ({ tablePage }) => {
    const testUser = generateUser();
    const totalRowsWithData = await tablePage.getTotalRowsWithData();

    await tablePage.openAddForm();
    await tablePage.modal.fillForm(testUser);
    await tablePage.modal.submitForm();

    const result = await tablePage.getDataRowsOnly();
    const { total, data } = result;
    expect(total).toBe(totalRowsWithData + 1);

    const found = Object.values(data).find((row) => row.includes(testUser.firstName) && row.includes(testUser.email));
    expect(found).toBeTruthy();
    expect(found).toContain(testUser.lastName);
    expect(found).toContain(testUser.age);
    expect(found).toContain(testUser.salary);
    expect(found).toContain(testUser.department);

    expect(await tablePage.getCellValue(testUser.lastName)).toContain(testUser.lastName);
  });

  test("Edit record and verify updated data", async ({ tablePage }) => {
    const testUser = generateUser({ department: "Engineering", salary: "75000" });
    await tablePage.openAddForm();
    await tablePage.modal.fillForm(testUser);
    await tablePage.modal.submitForm();

    const { data } = await tablePage.getDataRowsOnly();
    const found = Object.values(data).find((row) => row.includes(testUser.firstName) && row.includes(testUser.email));
    expect(found).toBeTruthy();
    const foundIndex = Object.keys(data).find((i) => data[+i] === found);

    const indexToEdit = Number(foundIndex);
    await tablePage.editRowByIndex(indexToEdit);
    await tablePage.modal.editForm({
      department: "Finance",
      salary: "150000",
    });
    await tablePage.modal.submitForm();

    const updatedRows = await tablePage.getDataRowsOnly();
    const updatedRow = updatedRows.data[indexToEdit];
    expect(updatedRow).toContain("Finance");
    expect(updatedRow).toContain("150000");

    expect(await tablePage.getCellValue("Finance")).toContain("Finance");
    expect(await tablePage.getCellValue("150000")).toContain("150000");
  });

  test("Delete record and verify it is removed", async ({ tablePage }) => {
    const testUser = generateUser();
    await tablePage.openAddForm();
    await tablePage.modal.fillForm(testUser);
    await tablePage.modal.submitForm();

    const totalRowsWithData = await tablePage.getTotalRowsWithData();
    const result = await tablePage.getDataRowsOnly();
    const { total, data } = result;
    expect(total).toEqual(totalRowsWithData);

    const found = Object.values(data).find((row) => row.includes(testUser.firstName) && row.includes(testUser.email));
    expect(found).toBeTruthy();
    const foundIndex = Object.keys(data).find((i) => data[+i] === found);

    const indexToDelete = Number(foundIndex);
    await tablePage.deleteRowByIndex(indexToDelete);

    const newResult = await tablePage.getDataRowsOnly();
    const newTotal = newResult.total;
    expect(newTotal).toEqual(totalRowsWithData - 1);

    const newData = newResult.data;
    const deletedRow = Object.values(newData).find((row) => row.includes(testUser.firstName) && row.includes(testUser.email));
    expect(deletedRow).toBeUndefined();
  });

  test("Search for a record and verify it exists", async ({ tablePage }) => {
    const testUser = generateUser();
    await tablePage.openAddForm();
    await tablePage.modal.fillForm(testUser);
    await tablePage.modal.submitForm();

    await tablePage.search(testUser.firstName);
    const result = await tablePage.getDataRowsOnly();
    const found = Object.values(result.data).find((row) => row.includes(testUser.firstName) && row.includes(testUser.email));

    expect(found).toBeTruthy();
    expect(found).toContain(testUser.lastName);
  });
});
