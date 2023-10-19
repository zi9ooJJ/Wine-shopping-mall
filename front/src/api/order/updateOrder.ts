import { intoOrderError, OrderErrorCode } from "../../errors";
import { UnknownError } from "../../errors/unknownError";
import { AxiosErrorModel, OrderModel, ResponseModel } from "../../models";
import { authClient } from "../httpClient";

interface UpdateOrderArg {
  _id: string;
  productId: string;
  ordererId: string;
  address: string;
  quantity: number;
  status: string;
  totalPrice: number;
}

export async function updateOrder({
  _id,
  productId,
  ordererId,
  address,
  quantity,
  status,
  totalPrice,
}: UpdateOrderArg): Promise<string> {
  try {
    const { data } = await authClient.put<ResponseModel<OrderModel>>(
      `/orders/${_id}`,
      {
        productId,
        ordererId,
        address,
        quantity,
        status,
        totalPrice,
      }
    );

    return data?.data?._id!;
  } catch (err) {
    const { response } = err as AxiosErrorModel;
    const errorCode = response?.data.errorCode;

    switch (errorCode as OrderErrorCode) {
      // Error1: 주소 잘못 입력
      case OrderErrorCode.ReInputAddress:
        throw intoOrderError(errorCode!);
      default:
        throw new UnknownError();
    }
  }
}
