import { Product } from "../entities/product.js";
import { ProductRepository } from "../ports/product-repository.js";

export interface FindProductInput {
  upc: string;
}

export interface FindProductResult {
  product: Product | null;
}

export class FindProduct {
  private readonly productRepository: ProductRepository;

  public constructor(options: { productRepository: ProductRepository }) {
    this.productRepository = options.productRepository;
  }

  public async handler(input: FindProductInput): Promise<FindProductResult> {
    const product = await this.productRepository.findProductByUpc(input.upc);
    return {
      product,
    };
  }
}
