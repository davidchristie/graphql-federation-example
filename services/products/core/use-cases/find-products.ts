import { Product } from "../entities/product.js";
import { ProductRepository } from "../ports/product-repository.js";

export interface FindProductsInput {
  upcs: string[];
}

export interface FindProductsResult {
  products: (Product | null)[];
}

export class FindProducts {
  private readonly productRepository: ProductRepository;

  public constructor(options: { productRepository: ProductRepository }) {
    this.productRepository = options.productRepository;
  }

  public async handler(input: FindProductsInput): Promise<FindProductsResult> {
    const products = await this.productRepository.findProductsByUpcs(
      ...input.upcs
    );
    return {
      products,
    };
  }
}
