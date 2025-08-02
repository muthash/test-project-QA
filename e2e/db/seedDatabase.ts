import { faker } from "@faker-js/faker";

import prisma from "../prisma";

async function seed() {
  const roles = ["Admin", "Editor", "Viewer", "Support"];
  console.log("Seeding roles...");
  const roleRecords = [];
  for (const name of roles) {
    const record = await prisma.role.upsert({
      create: {
        description: `${name} role`,
        name,
      },
      update: {},
      where: { name },
    });
    roleRecords.push(record);
  }
  console.log(
    "Seeded roles:",
    roleRecords.map((r) => r.name),
  );

  for (let record = 0; record < 20; record++) {
    const user = await prisma.appUser.create({
      data: {
        cannot_change_password: faker.datatype.boolean(),
        email: faker.internet.email(),
        enabled: faker.datatype.boolean(),
        firstname: faker.person.firstName(),
        last_time_password_updated: faker.date.past(),
        lastname: faker.person.lastName(),
        nonlocked: faker.datatype.boolean(),
        password: faker.internet.password(),
        password_never_expires: faker.datatype.boolean(),
        phones: {
          create: Array.from({ length: faker.number.int({ max: 3, min: 1 }) }).map(() => ({
            order_index: faker.number.int({ max: 5, min: 0 }),
            phone: "+2547" + faker.string.numeric(7),
            phone_country_id: 254,
          })),
        },

        roles: {
          create: faker.helpers.arrayElements(roleRecords, faker.number.int({ max: 2, min: 1 })).map((role) => ({
            role: { connect: { id: role.id } },
          })),
        },

        username: faker.internet.userName(),
      },
    });
    console.log(`Created user: ${user.username}`);
  }
}

seed()
  .then(async () => {
    console.log("Seed completed!");
    await prisma.$disconnect();
  })
  .catch(async (error: unknown) => {
    console.error("Seed error: ", error);
    await prisma.$disconnect();
    process.exit(1);
  });
