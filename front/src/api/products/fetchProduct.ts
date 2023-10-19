import { intoProductsError, ProductsErrorCode } from "../../errors";
import { UnknownError } from "../../errors/unknownError";
import { AxiosErrorModel, ProductModel, ResponseModel } from "../../models";
import { httpClient } from "../httpClient";

export interface FetchProductArg {
  productId: string;
}

export async function fetchProduct({
  productId,
}: FetchProductArg): Promise<ProductModel> {
  try {
    // authClient: token이 있을때만 사용
    // httpClient
    const { data } = await httpClient.get<ResponseModel<ProductModel>>(
      `/products/${productId}`
    );

    return data?.data!;
  } catch (err) {
    const { response } = err as AxiosErrorModel;
    const errorCode = response?.data.errorCode;

    switch (errorCode as ProductsErrorCode) {
      // Error1: 존재하지 않은 상품
      case ProductsErrorCode.InvalidProducts:
        throw intoProductsError(errorCode!);
      default:
        throw new UnknownError();
    }
  }
}
