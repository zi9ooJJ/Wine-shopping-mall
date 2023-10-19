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
import { useOrders } from "./useOrders";

// ProductsPage -> 구매하기 눌렀을 때, buyingProducts에서 눌린거 1개 넣기
// CartPage -> 체크 후 구매하기 눌렀을 때, buyingProducts에 cart item 넣기
/**
 *
 * @description
 * 특정 사용자가 주문한 것을 다 뽑아오는 api
 */
export function useMutateOrder() {
  const [error, setError] = useState<Error | null>(null);
  const { checkedProducts, removeProduct } = useCart();
  const { authUser } = useAuthUser();

  // 하나 처리
  async function _createOrder({
    address,
    ordererId,
    productId,
    price: totalPrice,
  }: CreateOrderArgs) {
    const newOrder = await createOrder({
      address,
      ordererId,
      productId,
      price: totalPrice,
    });
    return newOrder;
  }

  // 여러 개 처리
  async function _createOrders({ address }: { address: string }) {
    if (!authUser) {
      throw new Error(AuthErrorMessage.UserNotLoggedIn);
    }

    try {
      // TODO
      checkedProducts.forEach(async ({ price, _id }) => {
        await _createOrder({
          address,
          ordererId: authUser?._id,
          productId: _id,
          price,
        });
      });
    } catch (error) {
      if (error instanceof UnknownError) {
        throw error;
      }
      setError(error as Error);
    }
  }

  return { error, createOrders: _createOrders };
}
