import { Product } from "../core/entities/product.ts";
import { ProductRepository } from "../core/ports/product-repository.ts";

export class InMemoryProductRepository implements ProductRepository {
  private readonly products: Product[];

  public constructor(products: Product[] = []) {
    this.products = [...products];
  }

  public async findProductByUpc(upc: string): Promise<Product | null> {
    return this.products.find((product) => product.upc === upc) ?? null;
  }

  public async findProducts(input?: {
    limit?: number;
    orderBy?: { field: "unitsInStock"; order: "asc" | "desc" };
  }): Promise<Product[]> {
    const result = [...this.products];
    if (input?.orderBy !== undefined) {
      result.sort((product1, product2) => {
        if (input.orderBy) {
          return input.orderBy.order === "asc"
            ? product1[input.orderBy.field] - product2[input.orderBy.field]
            : product2[input.orderBy.field] - product1[input.orderBy.field];
        }
        return 0;
      });
    }
    const limit = input?.limit ?? 100;
    return result.slice(0, limit);
  }

  public async findProductsByUpcs(
    ...upcs: string[]
  ): Promise<(Product | null)[]> {
    return Promise.all(upcs.map((upc) => this.findProductByUpc(upc)));
  }
}
