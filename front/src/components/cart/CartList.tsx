import { useCart } from "../../hooks";
import { ProductModel } from "../../models";
import { CartItem } from "./CartItem";

export const CartList = () => {
  const { cart } = useCart();
  return (
    <div className="overflow-x-auto w-full">
      <table className="my-10 table w-full">
        <thead>
          <tr>
            <th>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </th>
            <th>상품명</th>
            <th>가격</th>
            <th>수량</th>
            <th></th>
            <th></th>
          </tr>
          {cart.map((cartProduct) => (
            <CartItem cartProduct={cartProduct} key={cartProduct._id} />
          ))}
        </thead>
        <tbody></tbody>
      </table>
    </div>
  );
};
