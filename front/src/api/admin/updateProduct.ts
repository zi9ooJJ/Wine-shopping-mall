import { IdData, ProductModel, ResponseModel } from "../../models";
import { authClient } from "../httpClient";

interface UpdateProductArgs {
  _id: string;
  name?: string;
  categoryId?: string;
  imageUrl?: string;
  price?: number;
  description?: string;
  producer?: string;
}

export async function updateProduct({
  _id,
  name,
  categoryId,
  imageUrl,
  price,
  description,
  producer,
}: UpdateProductArgs): Promise<null> {
  try {
    await authClient.put<ResponseModel<ProductModel>>(
      `/admin/products/${_id}`,
      {
        name,
        categoryId,
        imageUrl,
        price,
        description,
        producer,
      }
    );

    return null;
  } catch (err) {
    throw err;
  }
}
