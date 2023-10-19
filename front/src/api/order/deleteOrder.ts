import { intoOrderError, OrderErrorCode } from "../../errors";
import { UnknownError } from "../../errors/unknownError";
import { AxiosErrorModel } from "../../models";
import { authClient } from "../httpClient";

interface DeleteOrderArg {
  _id: string;
}

export async function deleteOrder({ _id }: DeleteOrderArg): Promise<null> {
  try {
    await authClient.delete<null>(`/orders/${_id}`);
    return null;
  } catch (err) {
    const { response } = err as AxiosErrorModel;
    const errorCode = response?.data.errorCode;

    switch (errorCode as OrderErrorCode) {
      //Error1: 존재하지 않는 상품정보
      case OrderErrorCode.InvalidOrder:
        throw intoOrderError(errorCode!);
      default:
        throw new UnknownError();
    }
  }
}
