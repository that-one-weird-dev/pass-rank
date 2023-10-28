import { Prisma, PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
import { sha256 } from "crypto-hash";

const prisma = new PrismaClient();

const USER_COUNT = parseInt(process.env.USER_COUNT ?? "") || 50;

async function main() {
  await prisma.user.deleteMany({});

  const users = new Array(USER_COUNT)
    .fill(null)
    .map(async () => {
      const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();

      const displayName = faker.person.fullName({ firstName, lastName });
      const username = firstName.toLowerCase();
      const password = await sha256(username);
      const ownershipToken = faker.string.uuid();
      const loginCount = faker.number.int({ min: 1, max: 100 });

      return {
        displayName,
        username,
        password,
        ownershipToken,
        loginCount,
      } satisfies Prisma.UserCreateManyInput;
    });

  await prisma.user.createMany({
    data: await Promise.all(users),
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
  });
