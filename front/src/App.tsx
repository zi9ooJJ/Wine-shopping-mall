import "./global.css";
import Router from "./Router";
import { HelmetProvider } from "react-helmet-async";
import {
  // ModalProvider,
  ErrorStackProvider,
  AuthUserProvider,
  CartProvider,
  // ModalContext,
} from "./providers";
import { Suspense, useEffect } from "react";
import {
  deleteOrder,
  fetchOrder,
  fetchOrdersByOrdererId,
  createOrder,
  updateOrder,
} from "./api/order";
import {
  fetchOrders,
  fetchOrdersByOrdererIdAdmin,
  createCategory,
  createProduct,
  deleteCategory,
  deleteOrder as deleteOrderAdmin,
  deleteProduct,
  updateCategory,
  updateOrder as updateOrderAdmin,
  updateProduct,
} from "./api/admin";
import { fetchCategories } from "./api/category";
import {
  fetchProduct,
  fetchProductsByCategoryId,
  fetchProducts,
} from "./api/products";
import { ErrorFallback, Layout, ManyShimmers } from "./components";
import { ErrorBoundary } from "react-error-boundary";

const App = () => {
  //delete: 개별주문삭제
  // async function deleteOrderTest() {
  //   await deleteOrder({
  //     _id: "63e48be89df2016c16adde13",
  //   });
  // }
  // post: 주문생성
  // async function ordersAuthTest() {
  //   await ordersAuth({
  //     productId: "63e0a47836c8a116692e3da5",
  //     ordererId: "63e3e3c0b7151e56e01d3741",
  //     address: "랄랄라",
  //     quantity: 1,
  //     status: "pending",
  //     totalPrice: 10000,
  //   });
  // }

  // fetch: 개별 object id 테스트 완
  // async function fetchOrderTest() {
  //   await fetchOrder({ _id: "63e48be89df2016c16adde13" });
  // }

  // update : 성공사례 테스트 완
  // async function updateOrderTest() {
  //   await updateOrder({
  //     _id: "63e48be89df2016c16adde13",
  //     productId: "63e0a47836c8a116692e3da5",
  //     ordererId: "63e3e3c0b7151e56e01d3741",
  //     address: "ㄹㄷㄹㄷㄹ",
  //     quantity: 1,
  //     status: "pending",
  //     totalPrice: 10000,
  //   });
  // }

  // fetch:관리자 전체 주문-테스트 완
  // async function fetchOrdersTest() {
  //   await fetchOrders();
  // }

  //  fetch:사용자별 주문조회- 테스트 완
  // async function fetchOrdersByOrdererIdTest() {
  //   await fetchOrdersByOrdererId({ ordererId: "" });
  // }

  // fetch: 관리자기준 사용자별 주문조회-테스트 완
  // async function fetchOrdersByOrdererIdAdminTest() {
  //   await fetchOrdersByOrdererIdAdmin({
  //     ordererId: "",
  //* 테스트 완료 - admin, category, products
  //* 카테고리 생성(추가)
  // async function createCategoryTest() {
  //   await createCategory({
  //     name: "",
  //     description: "",
  //   });
  // }

  //* 제품 생성(추가)
  // async function createProductTest() {
  //   await createProduct({
  //     name: "",
  //     categoryId: "",
  //     imageUrl: "",
  //     price: ,
  //     description: "",
  //     producer: "",
  //   });
  // }

  //* 카테고리 삭제
  // async function deleteCategoryTest() {
  //   await deleteCategory({
  //     _id: "",
  //   });
  // }

  //* 주문 삭제(관리자)
  // async function deleteOrderAdminTest() {
  //   await deleteOrderAdmin({
  //     _id: "",
  //   });
  // }

  //* 제품 삭제
  // async function deleteProductTest() {
  //   await deleteProduct({
  //     _id: "",
  //   });
  // }

  //* 카테고리 수정
  // async function updateCategoryTest() {
  //   await updateCategory({
  //     _id: "",
  //     name: "",
  //     description: "",
  //   });
  // }

  //* 주문 수정(관리자)
  // async function updateOrderAdminTest() {
  //   await updateOrderAdmin({
  //     _id: "",
  //     productId: "",
  //     ordererId: "",
  //     address: "",
  //     quantity: ,
  //     status: "",
  //     totalPrice: ,
  //   });
  // }

  //* 제품 수정
  // async function updateProductTest() {
  //   await updateProduct({
  //     _id: "",
  //     name: "",
  //     categoryId: "",
  //     imageUrl: "",
  //     price: ,
  //     description: "",
  //     producer: "",
  //   });
  // }

  //* 전체 카테고리 조회
  // async function fetchCategoriesTest() {
  //   await fetchCategories();
  // }

  //* 제품 상세 페이지 (제품 id별 조회)
  // async function fetchProductTest() {
  //   await fetchProduct({
  //     productId: "",
  //   });
  // }

  //* 전체 제품 조회
  // async function fetchProductsTest() {
  //   await fetchProducts();
  // }

  //* 카테고리별 제품 조회
  // async function fetchProductByCategoryTest() {
  //   await fetchProductByCategory({
  //     categoryId: "",
  //   });
  // }

  useEffect(() => {
    // deleteOrderTest();
    // ordersAuthTest();
    // fetchOrdersTest();
    // updateOrderTest();
    // fetchOrdersTest();
    // fetchOrdersByOrdererIdTest();
    // fetchOrdersByOrdererIdAdminTest();
    // createCategoryTest();
    // createProductTest();
    // deleteCategoryTest();
    // deleteOrderAdminTest();
    // deleteProductTest();
    // updateCategoryTest();
    // updateOrderAdminTest();
    // updateProductTest();
    // fetchCategoriesTest();
    // fetchProductTest();
    // fetchProductsTest();
    // fetchProductByCategoryTest();
  }, []);

  return (
    <div className="App">
      <HelmetProvider>
        <ErrorStackProvider>
          <AuthUserProvider>
            <CartProvider>
              <ErrorBoundary fallback={<ErrorFallback />}>
                <Suspense fallback={<ManyShimmers />}>
                  <Layout>
                    <Router />
                  </Layout>
                </Suspense>
              </ErrorBoundary>
            </CartProvider>
          </AuthUserProvider>
        </ErrorStackProvider>
      </HelmetProvider>
    </div>
  );
};

export default App;
