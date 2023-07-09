import { Product } from "../entities/product.ts";

export interface ProductRepository {
  findProductByUpc(upc: string): Promise<Product | null>;
  findProducts(input?: {
    limit?: number;
    orderBy?: { field: keyof Product; order: "asc" | "desc" };
  }): Promise<Product[]>;
  findProductsByUpcs(...upcs: string[]): Promise<(Product | null)[]>;
}
