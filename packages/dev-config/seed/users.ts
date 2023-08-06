import { faker } from "@faker-js/faker";

interface User {
  id: string;
  name: string;
  username: string;
  email: string;
}

function generateSeedUsers(): User[] {
  faker.seed(0);
  return [
    {
      id: faker.string.uuid(),
      name: "User",
      username: "user",
      email: "user@email.com",
    },
    {
      id: faker.string.uuid(),
      name: "Admin",
      username: "admin",
      email: "admin@email.com",
    },
    ...Array(998)
      .fill(null)
      .map(() => {
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        return {
          id: faker.string.uuid(),
          name: faker.person.fullName({ firstName, lastName }),
          username: faker.internet.userName({ firstName, lastName }),
          email: faker.internet.email({ firstName, lastName }),
        };
      }),
  ];
}

export const seedUsers = generateSeedUsers();
