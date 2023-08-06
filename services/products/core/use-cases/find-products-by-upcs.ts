import { Product } from "../entities/product.ts";
import { ProductRepository } from "../ports/product-repository.ts";

export interface FindProductsByUpcsInput {
  upcs: string[];
}

export interface FindProductsByUpcsResult {
  products: (Product | null)[];
}

export class FindProductsByUpcs {
  private readonly productRepository: ProductRepository;

  public constructor(options: { productRepository: ProductRepository }) {
    this.productRepository = options.productRepository;
  }

  public async handler(
    input: FindProductsByUpcsInput
  ): Promise<FindProductsByUpcsResult> {
    const products = await this.productRepository.findProductsByUpcs(
      ...input.upcs
    );
    return {
      products,
    };
  }
}
