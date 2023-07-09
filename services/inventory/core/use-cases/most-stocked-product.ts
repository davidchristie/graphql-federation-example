import { Product } from "../entities/product.ts";
import { ProductRepository } from "../ports/product-repository.ts";

export interface MostStockedProductResult {
  mostStockedProduct: Product | null;
}

export class MostStockedProduct {
  private readonly productRepository: ProductRepository;

  public constructor(options: { productRepository: ProductRepository }) {
    this.productRepository = options.productRepository;
  }

  public async handler(): Promise<MostStockedProductResult> {
    const products = await this.productRepository.findProducts({
      limit: 1,
      orderBy: { field: "unitsInStock", order: "desc" },
    });
    return {
      mostStockedProduct: products[0] ?? null,
    };
  }
}
