import { ProductModel } from "../../models";
import { ProductCard } from "./OrderCard";

interface OrdersCardsContainerProps {
  products: ProductModel[];
}

export const ProductCardsContainer = ({
  products,
}: OrdersCardsContainerProps) => {
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
