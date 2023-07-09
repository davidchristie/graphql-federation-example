import { Product } from "../entities/product.ts";
import { ProductRepository } from "../ports/product-repository.ts";

export interface ProductsInput {
  upcs: string[];
}

export interface ProductsResult {
  products: (Product | null)[];
}

export class Products {
  private readonly productRepository: ProductRepository;

  public constructor(options: { productRepository: ProductRepository }) {
    this.productRepository = options.productRepository;
  }

  public async handler(input: ProductsInput): Promise<ProductsResult> {
    const products = await this.productRepository.findProductsByUpcs(
      ...input.upcs
    );
    return {
      products,
    };
  }
}
