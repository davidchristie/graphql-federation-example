export interface ShippingEstimateInput {
  product: {
    price: number;
    weight: number;
  };
}

export interface ShippingEstimateResult {
  shippingEstimate: number;
}

export class ShippingEstimate {
  public async handler(
    input: ShippingEstimateInput
  ): Promise<ShippingEstimateResult> {
    // Free for expensive items, otherwise estimate based on weight
    const shippingEstimate =
      input.product.price > 1000 ? 0 : Math.round(input.product.weight * 0.5);
    return {
      shippingEstimate,
    };
  }
}
