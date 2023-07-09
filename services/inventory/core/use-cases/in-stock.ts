export interface InStockInput {
  product: {
    unitsInStock: number;
  };
}

export interface InStockResult {
  inStock: boolean;
}

export class InStock {
  public async handler(input: InStockInput): Promise<InStockResult> {
    const inStock = input.product.unitsInStock > 0;
    return {
      inStock,
    };
  }
}
