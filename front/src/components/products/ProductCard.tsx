import { useHistory } from "react-router-dom";
import { routes } from "../../config/routes";
import { useCart } from "../../hooks";
import { ProductModel } from "../../models";
import { toPriceString } from "../../utils";
import { Button } from "../base";
import { Joayo } from "../base/Joayo";

interface ProductCardProps {
  product: ProductModel;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { cart, addAndUntoggleOthers, addProduct } = useCart();
  const history = useHistory();
  return (
    // <div className="h-52 bg-purple-500">
    <>
      <div className="mt-20 w-1/2">
        <div className="py-11 px-14 w-11/12 bg-base-100 rounded-xl shadow-xl shadow-fuchsia-100">
          <figure className="flex justify-center items-center">
            <img
              src={product.imageUrl}
              alt={product.description}
              className="h-72 bg-cover"
            />
            {/* <div
            className="bg-cover"
            style={{
              backgroundImage: `url(${product.imageUrl})`,
            }}
          ></div> */}
          </figure>
          <div className="card-body w-full">
            <h2
              className={`card-title ${
                product.price > 10000000 ? "text-fuchsia-600" : "text-pink-500"
              }`}
            >
              {product.name}
            </h2>
            <p>{product.description}</p>
            <p>원산지 : {product.producer}</p>
            <span className="text-primary font-bold text-xl"></span>
            <span className="text-purple-500 font-bold">
              {toPriceString(product.price)}
            </span>
            <div className="flex w-fit mt-5 justify-end items-center">
              <Joayo className="mr-20" />
              <Button
                className="mr-3"
                onClick={() => {
                  addAndUntoggleOthers(product);
                  history.push(routes.cart.path);
                }}
                text="구매하기"
                // className="mr-2 border-0 btn btn-sm py-4 px-4 btn-active btn-secondary bg-gradient-to-tr from-purple-800 to-pink-300"
              />
              <Button
                onClick={() => {
                  addProduct(product);
                }}
                // className="border-0 btn btn-active btn-secondary bg-gradient-to-tr from-purple-800 to-pink-300"
                text="장바구니"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
