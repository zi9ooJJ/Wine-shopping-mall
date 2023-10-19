import { IdData, ResponseModel } from "../../models";
import { authClient } from "../httpClient";

interface DeleteCategoryArgs {
  _id: string;
}

export async function deleteCategory({
  _id,
}: DeleteCategoryArgs): Promise<null> {
  try {
    await authClient.delete<null>(`/admin/category/${_id}`);

    return null;
  } catch (err) {
    throw err;
  }
}
