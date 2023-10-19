import { ResponseModel } from "../../models";
import { authClient } from "../httpClient";

interface DeleteProductArg {
  _id: string;
}

export async function deleteProduct({ _id }: DeleteProductArg): Promise<null> {
  try {
    await authClient.delete<ResponseModel<null>>(`/admin/products/${_id}`);

    return null;
  } catch (err) {
    throw err;
  }
}
