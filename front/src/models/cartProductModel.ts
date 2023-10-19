import { ProductModel } from "./productModel";

export interface CartProductModel extends ProductModel {
  checked: boolean;
}
