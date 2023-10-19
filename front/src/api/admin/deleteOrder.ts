import { IdData, ResponseModel } from "../../models";
import { authClient } from "../httpClient";

interface DeleteOrderArgs {
  _id: string;
}

export async function deleteOrder({ _id }: DeleteOrderArgs): Promise<null> {
  try {
    await authClient.delete<null>(`/admin/orders/${_id}`);
    return null;
  } catch (err) {
    throw err;
  }
}
