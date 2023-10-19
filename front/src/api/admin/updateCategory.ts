import { CategoryModel, ResponseModel } from "../../models";
import { authClient } from "../httpClient";

interface UpdateCategoryArgs {
  _id: string;
  name?: string;
  description?: string;
}

export async function updateCategory({
  _id,
  name,
  description,
}: UpdateCategoryArgs): Promise<null> {
  try {
    await authClient.put<ResponseModel<CategoryModel>>(
      `/admin/category/${_id}`,
      { name, description }
    );
    return null;
  } catch (err) {
    throw err;
  }
}
