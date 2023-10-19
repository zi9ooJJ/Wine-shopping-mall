import { useCart, useOrders } from "../../hooks";
import { OrderModel, ProductModel } from "../../models";
import { OrderItem } from "./OrderItem";

interface OrderListProps {
  orders: OrderModel[];
}
export const OrderList = ({ orders }: OrderListProps) => {
  return (
    <div className="overflow-x-auto w-full">
      <table className="my-10 table w-full">
        <thead>
          <tr>
            <th>
              <label></label>
            </th>
            <th>주문 상품</th>
            <th>가격</th>
            <th>수량</th>
            <th>상태</th>
            <th>주문일</th>
            <th></th>
          </tr>
          {orders.map((order) => (
            <OrderItem order={order} key={order._id} />
          ))}
        </thead>
        <tbody></tbody>
      </table>
    </div>
  );
};
