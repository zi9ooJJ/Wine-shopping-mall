import { ResponseModel } from "../../models";
import { OrderModel } from "../../models/orderModel";
import { authClient } from "../httpClient";

interface FetchOrderArg {
  _id: string;
}

export async function fetchOrder({ _id }: FetchOrderArg): Promise<OrderModel> {
  try {
    const { data } = await authClient.get<ResponseModel<OrderModel>>(
      `/orders/${_id}`
    );

    return data?.data!;
  } catch (err) {
    throw err;
  }
}
