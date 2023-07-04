import { Product } from "../entities/product.js";

export interface ProductRepository {
  findProductByUpc(upc: string): Promise<Product | null>;
  findProducts(input?: { limit?: number }): Promise<Product[]>;
  findProductsByUpcs(...upcs: string[]): Promise<(Product | null)[]>;
}
