import { faker } from "@faker-js/faker";
import { seedProducts } from "./products.ts";
import { seedUsers } from "./users.ts";

interface Review {
  id: string;
  authorId: string;
  productUpc: string;
  body: string;
  rating: number;
}

function generateSeedReviews(): Review[] {
  faker.seed(0);
  return Array(1000)
    .fill(null)
    .map(() => {
      const product = seedProducts[faker.number.int(seedProducts.length - 1)];
      const user = seedUsers[faker.number.int(seedUsers.length - 1)];
      return {
        id: faker.string.uuid(),
        productUpc: product.upc,
        authorId: user.id,
        rating: faker.number.int({ min: 1, max: 5 }),
        body: faker.lorem.text(),
      };
    });
}

export const seedReviews = generateSeedReviews();
