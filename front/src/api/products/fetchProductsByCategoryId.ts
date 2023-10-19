import { ProductModel, ResponseModel } from "../../models";
import { httpClient } from "../httpClient";

interface FetchProductArgs {
  categoryId: string;
}

export async function fetchProductsByCategoryId({
  categoryId,
}: FetchProductArgs): Promise<ProductModel[]> {
  try {
    const { data } = await httpClient.get<ResponseModel<ProductModel[]>>(
      `/products?categoryId=${categoryId}`
    );

    return data?.data!;
  } catch (err) {
    throw err;
  }
}
