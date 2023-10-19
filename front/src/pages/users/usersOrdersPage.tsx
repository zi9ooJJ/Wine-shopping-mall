import { Helmet } from "react-helmet-async";
import { useHistory } from "react-router-dom";
import { routes } from "../../config/routes";
import { useAuthUser, useOrders } from "../../hooks";
import { ManyShimmers } from "../../components";
// import { Order } from "../../components/order/OrderDetail";
import { AuthErrorMessage, OrderErrorMessage } from "../../errors";
import { OrderList } from "../../components/order";

// 주문 내역
const UsersOrdersPage = () => {
  // 로그인 안 되어 있으면 주문 못함
  const { error, isLoading, orders } = useOrders();

  if (isLoading) {
    return <ManyShimmers />;
  }

  if (error) {
    //
    alert("오류입니다. 홈페이지로 이동해주세요");
    return <></>;
  }

  return (
    <>
      <Helmet>
        <title>상품 구매</title>
      </Helmet>
      <OrderList orders={orders} />
    </>
  );
};

export default UsersOrdersPage;
