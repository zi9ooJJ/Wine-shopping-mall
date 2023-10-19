import { LOCAL_STORAGE_CART_KEY } from "../../config/constants";
import { CartProductModel } from "../../models";

export function getLocalStorageCart(): CartProductModel[] {
  let cartJson = localStorage.getItem(LOCAL_STORAGE_CART_KEY);
  if (cartJson === null) {
    return [];
  }
  return JSON.parse(cartJson);
}
