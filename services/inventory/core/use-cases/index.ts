import { Ports } from "../ports/index.ts";
import { InStock } from "./in-stock.ts";
import { MostStockedProduct } from "./most-stocked-product.ts";
import { Products } from "./products.ts";
import { ShippingEstimate } from "./shipping-estimate.ts";

export interface UseCases {
  inStock: InStock;
  mostStockedProduct: MostStockedProduct;
  products: Products;
  shippingEstimate: ShippingEstimate;
}

export function createUseCases(options: { ports: Ports }): UseCases {
  return {
    inStock: new InStock(),
    mostStockedProduct: new MostStockedProduct({
      productRepository: options.ports.productRepository,
    }),
    products: new Products({
      productRepository: options.ports.productRepository,
    }),
    shippingEstimate: new ShippingEstimate(),
  };
}
