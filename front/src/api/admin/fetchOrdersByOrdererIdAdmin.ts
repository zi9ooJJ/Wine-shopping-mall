import { ResponseModel } from "../../models";
import { OrderModel } from "../../models/orderModel";
import { authClient } from "../httpClient";

interface FetchOrdersByOrdererIdAdminArg {
  ordererId: string;
}

export async function fetchOrdersByOrdererIdAdmin({
  ordererId,
}: FetchOrdersByOrdererIdAdminArg): Promise<OrderModel[]> {
  try {
    const { data } = await authClient.get<ResponseModel<OrderModel[]>>(
      `/admin/orders?ordererId=${ordererId}`
    );

    return data?.data!;
  } catch (err) {
    throw err;
  }
}
