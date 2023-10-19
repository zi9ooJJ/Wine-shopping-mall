import { authClient } from "../httpClient";
import { CategoryModel, ResponseModel } from "../../models";

interface CategoryArgs {
  name: string;
  description: string;
}

export async function createCategory({
  name,
  description,
}: CategoryArgs): Promise<string> {
  try {
    const { data } = await authClient.post<ResponseModel<CategoryModel>>(
      "/admin/category",
      {
        name,
        description,
      }
    );

    return data?.data?._id!;
  } catch (err) {
    throw err;
  }
}
