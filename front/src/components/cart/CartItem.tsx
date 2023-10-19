import { ChangeEvent } from "react";
import { useHistory } from "react-router-dom";
import { routes } from "../../config/routes";
import { useCart } from "../../hooks";
import { CartProductModel } from "../../models";
import { toPriceString } from "../../utils";

interface CartItemProps {
  cartProduct: CartProductModel;
}

export const CartItem = ({ cartProduct }: CartItemProps) => {
  const { addAndUntoggleOthers, toggleChecked, removeProduct } = useCart();
  const history = useHistory();

  function onChecked(event: ChangeEvent<HTMLInputElement>) {
    toggleChecked(cartProduct._id, event.target.checked);
  }
  return (
    <tr>
      <th>
        <label>
          <input
            type="checkbox"
            className="checkbox"
            checked={cartProduct.checked}
            onChange={onChecked}
          />
        </label>
      </th>
      <td>
        <div className="flex items-center space-x-3">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              <img
                src={`${cartProduct.imageUrl}`}
                alt={cartProduct.description}
                className="bg-cover"
              />
            </div>
          </div>
          <div>
            <div className="font-bold">{cartProduct.name}</div>
            <div className="text-xs opacity-50">{cartProduct.producer}</div>
          </div>
        </div>
      </td>
      <td>
        {toPriceString(cartProduct.price)}
        <br />
      </td>
      <td>1</td>
      <th>
        <button
          onClick={() => {
            addAndUntoggleOthers(cartProduct);
          }}
          className="btn btn-ghost btn-xs"
        ></button>
      </th>

      <td>
        <div
          className="hover:cursor-pointer px-10 active:opacity-50"
          onClick={() => removeProduct(cartProduct._id)}
        >
          ❌
        </div>
      </td>
    </tr>
  );
};
