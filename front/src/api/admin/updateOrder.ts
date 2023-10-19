import { IdData, OrderModel, ResponseModel } from "../../models";
import { authClient } from "../httpClient";

interface UpdateOrderArgs {
  _id: string;
  productId?: string;
  ordererId?: string;
  address?: string;
  quantity?: number;
  status?: string;
  totalPrice?: number;
}

export async function updateOrder({
  _id,
  productId,
  ordererId,
  address,
  quantity,
  status,
  totalPrice,
}: UpdateOrderArgs): Promise<null> {
  try {
    await authClient.put<ResponseModel<OrderModel>>(`/admin/orders/${_id}`, {
      productId,
      ordererId,
      address,
      quantity,
      status,
      totalPrice,
    });

    return null;
  } catch (err) {
    throw err;
  }
}
