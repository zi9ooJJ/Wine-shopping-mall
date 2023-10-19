import { ProductModel, ResponseModel } from "../../models";
import { authClient } from "../httpClient";

interface CreateProductArgs {
  name: string;
  categoryId: string;
  imageUrl: string;
  price: number;
  description: string;
  producer: string;
}

export async function createProduct({
  name,
  categoryId,
  imageUrl,
  price,
  description,
  producer,
}: CreateProductArgs): Promise<string> {
  try {
    const { data } = await authClient.post<ResponseModel<ProductModel>>(
      "/admin/products",
      {
        name,
        categoryId,
        imageUrl,
        price,
        description,
        producer,
      }
    );

    return data?.data?._id!;
  } catch (err) {
    throw err;
  }
}
