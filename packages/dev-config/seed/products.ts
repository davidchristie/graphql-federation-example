import { faker } from "@faker-js/faker";

interface Product {
  upc: string;
  name: string;
  price: number;
  weight: number;
  imageUrl: string;
  isNew: boolean;
}

function generateSeedProducts(): Product[] {
  faker.seed(0);
  return Array(1000)
    .fill(null)
    .map(() => ({
      upc: faker.string.uuid(),
      name: faker.commerce.product(),
      imageUrl: faker.image.urlLoremFlickr({ category: "product" }),
      isNew: faker.number.int({ min: 0, max: 5 }) === 0,
      price: faker.number.int({ min: 1, max: 1000 }),
      weight: faker.number.int({ min: 1, max: 1000 }),
    }));
}

export const seedProducts = generateSeedProducts();
