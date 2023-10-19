import { LOCAL_STORAGE_CART_KEY } from "../../config/constants";
import { CartProductModel } from "../../models";

interface SetLocalStorageCartArgs {
  cart: CartProductModel[];
}

export function setLocalStorageCart({ cart }: SetLocalStorageCartArgs) {
  localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(cart));
}
