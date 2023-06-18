import { ProductSummary } from "../types/product-summary";

export interface ProductCardProps {
  product: ProductSummary;
}

export function ProductCard(props: ProductCardProps) {
  return (
    <div>
      <h2>{props.product.name}</h2>
      {Intl.NumberFormat("en-US", {
        currency: "usd",
      }).format(props.product.price)}
    </div>
  );
}
