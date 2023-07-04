import { Product } from "../core/entities/product.js";
import { ProductRepository } from "../core/ports/product-repository.js";

export class InMemoryProductRepository implements ProductRepository {
  private readonly products: Product[];

  public constructor(products: Product[] = []) {
    this.products = [...products];
  }

  public async findProductByUpc(upc: string): Promise<Product | null> {
    return this.products.find((product) => product.upc === upc) ?? null;
  }

  public async findProducts(input?: { limit?: number }): Promise<Product[]> {
    const limit = input?.limit ?? 100;
    return this.products.slice(0, limit);
  }

  public async findProductsByUpcs(
    ...upcs: string[]
  ): Promise<(Product | null)[]> {
    return Promise.all(upcs.map((upc) => this.findProductByUpc(upc)));
  }
}
