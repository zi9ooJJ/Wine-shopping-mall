import { LOCAL_STORAGE_CART_KEY } from "../../config/constants";
import { getLocalStorageCart } from "./getLocalStorageCart";
import { setLocalStorageCart } from "./setLocalStorageCart";

interface RemoveLocalStorageCartItemArgs {
  cartId: string;
}

export function removeLocalStorageCartItem({
  cartId,
}: RemoveLocalStorageCartItemArgs) {
  let cart = getLocalStorageCart();
  cart = cart.filter((cartItem) => cartItem._id === cartId);
  setLocalStorageCart({ cart });
}

export function removeLocalStorageCart() {
  localStorage.setItem(LOCAL_STORAGE_CART_KEY, "[]");
}
