import { ProductCard } from "./products/components/product-card";
import { useProducts } from "./products/hooks/use-products";

export function App(): JSX.Element {
  const products = useProducts();
  return (
    <div>
      <h1>App</h1>
      {products.data?.products
        .flatMap((product) => (product === null ? [] : [product]))
        .map((product) => (
          <ProductCard key={product.upc} product={product} />
        ))}
      <pre>{JSON.stringify(products, undefined, 2)}</pre>
    </div>
  );
}
