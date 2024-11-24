import prisma from "./../index";
import bcrypt from 'bcrypt';
async function main() {
  const moon = await prisma.user.upsert({
    where: { number: "9999999999" },
    update: {},
    create: {
      number: "9999999999",
      password: await bcrypt.hash("moon", 10),
      name: "moon",
      Balance: {
        create: {
          amount: 20000, // 200 BDT ; No decimal for precision issue
          locked: 0,
        },
      },
      OnRampTransaction: {
        create: {
          startTime: new Date(),
          status: "Success",
          amount: 20000,
          token: "122",
          provider: "EBL",
        },
      },
    },
  });
  const nadia = await prisma.user.upsert({
    where: { number: "9999999998" },
    update: {},
    create: {
      number: "9999999998",
      password: await bcrypt.hash("nadia", 10),
      name: "nadia",
      Balance: {
        create: {
          amount: 2000, // 20 BDT
          locked: 0,
        },
      },
      OnRampTransaction: {
        create: {
          startTime: new Date(),
          status: "Failure",
          amount: 2000,
          token: "123",
          provider: "EBL",
        },
      },
    },
  });
  console.log({ moon, nadia });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
