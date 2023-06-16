import { useGraphQL } from "./hooks/use-graphql";
import { productsQueryDocument } from "./operations/queries/products";

export function App(): JSX.Element {
  const products = useGraphQL(productsQueryDocument);
  return (
    <div>
      <h1>App</h1>
      <pre>{JSON.stringify(products, undefined, 2)}</pre>
    </div>
  );
}
