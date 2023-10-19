import { ProductModel, ResponseModel } from "../../models";
import { httpClient } from "../httpClient";

export async function fetchProducts(): Promise<ProductModel[]> {
  try {
    // authClient: token이 있을때만 사용
    // httpClient
    const { data } = await httpClient.get<ResponseModel<ProductModel[]>>(
      "/products"
    );

    return data?.data!;
  } catch (err) {
    throw err;
  }
}
