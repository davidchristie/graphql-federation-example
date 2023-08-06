import { Product } from "../entities/product.ts";
import { ProductRepository } from "../ports/product-repository.ts";

export interface FindProductsInput {
  first: number;
}

export interface FindProductsResult {
  products: Product[];
}

export class TopProducts {
  private readonly productRepository: ProductRepository;

  public constructor(options: { productRepository: ProductRepository }) {
    this.productRepository = options.productRepository;
  }

  public async handler(input: FindProductsInput): Promise<FindProductsResult> {
    const products = await this.productRepository.findProducts({
      limit: input.first,
    });
    return {
      products,
    };
  }
}
