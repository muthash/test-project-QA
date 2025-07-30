import prisma from "../prisma";

async function unseed() {
  // Delete child records first to avoid constraint violations
  await prisma.appUserRole.deleteMany();
  await prisma.userPhone.deleteMany();

  await prisma.appUser.deleteMany();

  // Optionally remove seeded roles
  await prisma.role.deleteMany();

  console.log("Unseed completed!");
}

unseed()
  .then(async () => await prisma.$disconnect())
  .catch(async (error) => {
    console.error("Unseed error:", error);
    await prisma.$disconnect();
    process.exit(1);
  });
