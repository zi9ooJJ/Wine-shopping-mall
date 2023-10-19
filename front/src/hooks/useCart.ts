import { useContext, useMemo } from "react";
import { CartContext } from "../providers";

export function useCart() {
  const {
    cart,
    checkedProducts,
    addAndUntoggleOthers,
    add: addProduct,
    remove: removeProduct,
    removeAll: removeAllProducts,
    toggleChecked,
  } = useContext(CartContext);

  return useMemo(
    () => ({
      addProduct,
      addAndUntoggleOthers,
      removeProduct,
      removeAllProducts,
      toggleChecked,
      cart,
      checkedProducts,
    }),
    [
      cart,
      addProduct,
      removeProduct,
      removeAllProducts,
      toggleChecked,
      addAndUntoggleOthers,
      checkedProducts,
    ]
  );
}
