import { ResponseModel, AxiosErrorModel } from "../../models";
import { OrderModel } from "../../models/orderModel";
import { authClient } from "../httpClient";
import { OrderErrorCode, intoOrderError } from "../../errors";

export async function fetchOrders(): Promise<OrderModel[]> {
  try {
    const { data } = await authClient.get<ResponseModel<OrderModel[]>>(
      "/admin/orders"
    );

    return data?.data!;
  } catch (err) {
    const { response } = err as AxiosErrorModel;
    const errorCode = response?.data.errorCode;

    if (errorCode === OrderErrorCode.InvalidOrder) {
      throw intoOrderError(errorCode!);
    }
    throw err;
  }
}
