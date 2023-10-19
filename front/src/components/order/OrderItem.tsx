import { ChangeEvent } from "react";
import { useHistory } from "react-router-dom";
import { routes } from "../../config/routes";
import { useCart, useProduct } from "../../hooks";
import { CartProductModel, OrderModel } from "../../models";
import { toPriceString, toStatusString } from "../../utils";

interface OrderItemProps {
  order: OrderModel;
}

export const OrderItem = ({ order }: OrderItemProps) => {
  const history = useHistory();
  const { product } = useProduct({ productId: order.productId });

  if (product === null) {
    return <></>;
  }
  //   <th>주문 상품</th>
  //   <th>가격</th>
  //   <th>수량</th>
  //   <th>주문일</th>
  //   <th>상태</th>
  //   <th></th>
  return (
    <tr>
      <th>
        <label></label>
      </th>
      <td>
        <div className="flex items-center space-x-3">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              <img
                src={`${product.imageUrl}`}
                alt={product.description}
                className="bg-cover"
              />
            </div>
          </div>
          <div>
            <div className="font-bold">{product.name}</div>
            <div className="text-xs opacity-50">{product.producer}</div>
          </div>
        </div>
      </td>
      <td>
        {toPriceString(order.totalPrice)}

        <br />
      </td>
      <td>1</td>
      <td>{toStatusString(order.status)}</td>
      <td>{order.createdAt.toString().split("T")[0]}</td>
      <td></td>
    </tr>
  );
};
