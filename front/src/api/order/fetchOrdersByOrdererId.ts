import { ResponseModel } from "../../models";
import { OrderModel } from "../../models/orderModel";
import { authClient } from "../httpClient";

interface FetchOrdersByOrdererIdArg {
  ordererId: string;
}

export async function fetchOrdersByOrdererId({
  ordererId,
}: FetchOrdersByOrdererIdArg): Promise<OrderModel[]> {
  try {
    const { data } = await authClient.get<ResponseModel<OrderModel[]>>(
      `/orders?ordererId=${ordererId}`
    );

    return data?.data!;
  } catch (err) {
    throw err;
  }
}
