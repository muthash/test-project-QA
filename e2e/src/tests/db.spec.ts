import { expect, test } from "@playwright/test";

import prisma from "../../prisma";

test.describe("Database Tests", () => {
  test("prisma - users", async ({}, testInfo) => {
    const users = await prisma.appUser.findMany({
      include: {
        phones: true,
        roles: { include: { role: true } },
      },
    });

    const data = JSON.stringify(users, null, 2);
    await testInfo.attach("users.json", {
      body: data,
      contentType: "application/json",
    });

    expect(users.length).toBeGreaterThan(0);
  });

  test("prisma - roles", async ({}, testInfo) => {
    const roles = await prisma.role.findMany();

    const data = JSON.stringify(roles, null, 2);
    await testInfo.attach("roles.json", {
      body: data,
      contentType: "application/json",
    });

    expect(roles.length).toBeGreaterThan(0);
  });
});
