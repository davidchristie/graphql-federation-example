import { faker } from "@faker-js/faker";
import { seedProducts } from "./products.ts";

interface Inventory {
  upc: string;
  unitsInStock: number;
}

function generateSeedInventory(): Inventory[] {
  faker.seed(0);
  return seedProducts.map((product) => ({
    upc: product.upc,
    unitsInStock: faker.number.int({ min: 0, max: 10 }),
  }));
}

export const seedInventory = generateSeedInventory();
