import {
  AxiosErrorModel,
  ResponseModel,
  OrderModel,
  OrderStatus,
} from "../../models";
import { OrderErrorCode, intoOrderError } from "../../errors";
import { authClient } from "../httpClient";
import { UnknownError } from "../../errors/unknownError";

export interface CreateOrderArgs {
  productId: string;
  ordererId: string;
  address: string;
  price: number;
}

export async function createOrder({
  productId,
  ordererId,
  address,
  price,
}: CreateOrderArgs): Promise<OrderModel> {
  //orderAuth => OrdersAuth
  try {
    const { data } = await authClient.post<ResponseModel<OrderModel>>(
      "/orders",
      {
        productId,
        ordererId,
        address,
        quantity: 1,
        status: OrderStatus.pending,
        totalPrice: price,
      }
    );

    return data?.data!;
  } catch (err) {
    const { response } = err as AxiosErrorModel;
    const errorCode = response?.data.errorCode;

    switch (errorCode as OrderErrorCode) {
      // Error1: 필수 값 입력 X
      case OrderErrorCode.NotInputInfo:
      // Error2: 총 합계가 0 미만
      case OrderErrorCode.LessThanZero:
        throw intoOrderError(errorCode!);
      default:
        throw new UnknownError();
    }
  }
}
