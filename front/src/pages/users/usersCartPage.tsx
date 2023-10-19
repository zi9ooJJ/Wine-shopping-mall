import { useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { useHistory } from "react-router-dom";
import { CartList, ManyShimmers } from "../../components";
import { routes } from "../../config/routes";
import { useCart, useMutateOrder, useOrders, useProducts } from "../../hooks";
import { useUser } from "../../hooks/useUser";
import { toPriceString } from "../../utils";

const UsersCartPage = () => {
  const { removeAllProducts, cart, checkedProducts } = useCart();
  const { user, isLoading: isUserLoading, error: userError } = useUser();
  const { createOrders } = useMutateOrder();
  const history = useHistory();

  function confirmRemoveAllProducts() {
    if (!confirm("장바구니를 정말 비우실 건가요?")) {
      return <></>;
    }
    removeAllProducts();
  }

  function confirmBuyAllProducts() {
    if (!confirm("선택 상품을 구매하실건가요?")) {
      return <></>;
    }
    if (getTotalPrice() === 0) {
      alert("선택된 상품이 없습니다");
      return <></>;
    }
    createOrders({ address: user?.address! }).then(() => {
      alert("주문이 완료되었읍니다.");
      history.push(routes.home.path);
    });
  }

  function getTotalPrice() {
    return cart.reduce((p, c) => {
      if (c.checked) {
        return p + c.price;
      }
      return p;
    }, 0);
  }
  if (isUserLoading) {
    return <ManyShimmers />;
  }

  if (!user) {
    history.push(routes.wrong.path);
    return <></>;
  }

  if (userError) {
    history.push(routes.wrong.path);
    return <></>;
  }

  return (
    <div>
      <Helmet>
        <title>장바구니</title>
      </Helmet>
      <div className="pt-10 -mb-4">
        <div className="flex items-center justify-between mr-2">
          <button onClick={confirmRemoveAllProducts} className="btn">
            장바구니 비우기
          </button>
          <h1 className="ml-4 mt-4">배송지: {user!.address}</h1>
        </div>
      </div>
      <div>
        <CartList />
      </div>
      <div className="flex justify-end mr-2 mb-10">
        <span className="mr-4">
          <div className="animate-pulse text-xl font-extrabold">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
              선택 상품
            </span>
          </div>
          <span className="text-pink-600 text-lg font-medium">
            총 합계: {toPriceString(getTotalPrice())}
          </span>
        </span>
        <button
          onClick={confirmBuyAllProducts}
          className="border-0 btn btn-active btn-secondary"
        >
          상품 구매하기
        </button>
      </div>
    </div>
  );
};

export default UsersCartPage;
