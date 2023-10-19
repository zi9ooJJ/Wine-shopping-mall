import { ProductModel } from "../../models";
import { ProductCard } from "./ProductCard";

interface ProductCardsContainerProps {
  products: ProductModel[];
}

export const ProductCardsContainer = ({
  products,
}: ProductCardsContainerProps) => {
  return (
    <div className="flex mb-20 flex-wrap w-5/6">
      {/* <div className="w-full"></div> */}
      {/* <button className="btn btn-outline">Previous page</button>
      <button className="btn btn-outline">Next</button>
      <button className="btn btn-outline">Next</button> */}
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};
