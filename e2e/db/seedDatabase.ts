import { faker } from "@faker-js/faker";
import prisma from "../prisma";

async function seed() {
  const roles = ["Admin", "Editor", "Viewer", "Support"];

  console.log("Seeding roles...");
  const roleRecords = [];
  for (const name of roles) {
    const record = await prisma.role.upsert({
      where: { name },
      update: {},
      create: {
        name,
        description: `${name} role`,
      },
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
        username: faker.internet.userName(),
        firstname: faker.person.firstName(),
        lastname: faker.person.lastName(),
        password: faker.internet.password(),
        email: faker.internet.email(),
        nonlocked: faker.datatype.boolean(),
        enabled: faker.datatype.boolean(),
        last_time_password_updated: faker.date.past(),
        password_never_expires: faker.datatype.boolean(),
        cannot_change_password: faker.datatype.boolean(),

        phones: {
          create: Array.from({ length: faker.number.int({ min: 1, max: 3 }) }).map(() => ({
            phone: "+2547" + faker.string.numeric(7),
            phone_country_id: 254,
            order_index: faker.number.int({ min: 0, max: 5 }),
          })),
        },

        roles: {
          create: faker.helpers.arrayElements(roleRecords, faker.number.int({ min: 1, max: 2 })).map((role) => ({
            role: { connect: { id: role.id } },
          })),
        },
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
  .catch(async (error) => {
    console.error("Seed error: ", error);
    await prisma.$disconnect();
    process.exit(1);
  });
