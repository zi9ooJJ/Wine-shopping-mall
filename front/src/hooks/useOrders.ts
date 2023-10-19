import { useState, useEffect } from "react";
import {
  createOrder,
  CreateOrderArgs,
  fetchOrder,
  fetchOrdersByOrdererId,
} from "../api/order";
import { fetchProducts } from "../api/products";
import { AuthErrorMessage, UnknownError } from "../errors";
import {
  CartProductModel,
  OrderModel,
  OrderStatus,
  ProductModel,
} from "../models";
import { useAuthUser } from "./useAuthUser";
import { useCart } from "./useCart";

// ProductsPage -> 구매하기 눌렀을 때, buyingProducts에서 눌린거 1개 넣기
// CartPage -> 체크 후 구매하기 눌렀을 때, buyingProducts에 cart item 넣기

// [O] 1. 와인A
// [ ] 2. 와인X
// [ ] 3. 와인B
// [ ] 4. 와인C
// [ ] 5. 와인D
// [ ] 6. 와인E [구매하기]
//
//
//
//
//

/**
 *
 * @description
 * 특정 사용자가 주문한 것을 다 뽑아오는 api
 */
export function useOrders() {
  const [orders, setOrders] = useState<OrderModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { authUser } = useAuthUser();

  async function _fetchOrders() {
    setIsLoading(true);
    try {
      if (!authUser) {
        throw new Error(AuthErrorMessage.UserNotLoggedIn);
      }
      const orders = await fetchOrdersByOrdererId({
        ordererId: authUser?._id!,
      });
      setOrders(orders);
    } catch (err) {
      if (err instanceof UnknownError) throw err;
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    _fetchOrders();
  }, []);

  return { orders, isLoading, error };
}
