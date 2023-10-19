import { ResponseModel } from "../../models";
import { CategoryModel } from "../../models/categoryModel";
import { httpClient } from "../httpClient";

export async function fetchCategories(): Promise<CategoryModel[]> {
  try {
    const { data } = await httpClient.get<ResponseModel<CategoryModel[]>>(
      "/categories"
    );

    return data?.data!;
  } catch (err) {
    throw err;
  }
}
