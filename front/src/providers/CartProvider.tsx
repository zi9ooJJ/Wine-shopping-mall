import { createContext, useState, useEffect } from "react";
import { CartProductModel, ProductModel } from "../models";
import {
  getLocalStorageCart,
  removeLocalStorageCart,
  setLocalStorageCart,
} from "../utils/localStorage";

interface CartContextValues {
  cart: CartProductModel[];
  checkedProducts: CartProductModel[];
  toggleChecked: (productId: string, checked: boolean) => void;
  add: (product: ProductModel) => void;
  remove: (productId: string) => void;
  removeAll: () => void;
  addAndUntoggleOthers: (product: ProductModel) => void;
}

interface CartContextProviderProps {
  children: React.ReactNode;
}

export const CartContext = createContext<CartContextValues>({
  cart: [],
  checkedProducts: [],
  toggleChecked: () => {},
  add: () => {},
  remove: () => {},
  removeAll: () => {},
  addAndUntoggleOthers: () => {},
});

/**
 *
 * @description
 * cart - 장바구니에 담긴 모든 상품
 * checkedProducts - 장바구니에 담긴 상품들 중 구매를 위해 선택된 상품
 */
export const CartProvider = ({ children }: CartContextProviderProps) => {
  const [cart, setCart] = useState<CartProductModel[]>([]);
  const [checkedProducts, setCheckedProducts] = useState<CartProductModel[]>(
    []
  );
  // const [checkedCart, setCheckedCart] = useState<CartProductModel[]>([]);
  // const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    // if (!isLoaded) {
    const cart = getLocalStorageCart();
    // setIsLoaded(true);
    setCart(cart);
    // }
  }, []);

  useEffect(() => {
    setCheckedProducts(cart.filter((cartProduct) => cartProduct.checked));
  }, [cart]);

  /**
   *
   * @description 장바구니에 담긴 상품 정보 가져오기(LocalStorage)
   */
  function get(productId: string) {
    const cartProducts = getLocalStorageCart();
    return cartProducts.find((cartProduct) => cartProduct._id === productId);
  }
  /**
   *
   * @description 장바구니에 상품 추가
   */
  function add(product: ProductModel, checked: boolean = false) {
    // 다음 장바구니 상태
    // 1. LocalStorage에 이미 같은 상품이 있는지 찾기
    // 2. 없으면 추가
    const nextCart = [
      ...cart.filter((cartProduct) => cartProduct._id !== product._id),
      {
        ...product,
        checked: checked,
      },
    ];

    // 상태
    setCart(nextCart);
    // 로컬 스토리지
    setLocalStorageCart({ cart: nextCart });
  }
  /**
   *
   * @description 장바구니에 상품 제거
   */
  function remove(productId: string) {
    const nextCart = cart.filter((p) => p._id !== productId);
    setCart(nextCart);
    setLocalStorageCart({ cart: nextCart });
  }
  /**
   *
   * @description 장바구니 비우기
   */
  function removeAll() {
    setCart([]);
    setLocalStorageCart({ cart: [] });
  }

  /**
   *
   * @description /products 페이지에서 구매하기를 눌렀을 때,
   * 해당 상품 외의 모든 상품의 체크를 해제한다
   */
  function addAndUntoggleOthers(product: ProductModel) {
    // 1. 토글 -> 넣고
    setCart((prev) =>
      prev.map((cartProduct) => ({
        ...cartProduct,
        checked: false,
      }))
    );
    add(product, true);

    // setCart((prev) => {
    //   prev.map((cartProduct) => ({
    //     ...cartProduct,
    //     checked: false,
    //   }));
    //   prev.push({ ...product, checked: true });
    //   return prev;
    // });
    setLocalStorageCart({ cart });
  }

  function toggleChecked(productId: string, checked: boolean) {
    setCart((prev) =>
      prev.map((cartProduct) => {
        if (cartProduct._id === productId) {
          return {
            ...cartProduct,
            checked,
          };
        }
        return cartProduct;
      })
    );
    setLocalStorageCart({ cart });
  }

  // 실험해보기,,
  const values = {
    cart,
    checkedProducts,
    add,
    remove,
    removeAll,
    toggleChecked,
    addAndUntoggleOthers,
  };
  return <CartContext.Provider value={values}>{children}</CartContext.Provider>;
};
