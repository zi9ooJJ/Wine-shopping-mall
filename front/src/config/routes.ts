import { lazy } from "react";

export const routes = {
  home: {
    path: "/",
    component: lazy(() => import("../pages/HomePage")),
    exact: true,
  },
  login: {
    path: "/auth/login",
    component: lazy(() => import("../pages/auth/loginPage")),
    exact: false,
  },
  logout: {
    path: "/auth/logout",
    component: lazy(() => import("../pages/auth/LogoutPage")),
    exact: false,
  },
  register: {
    path: "/auth/register",
    component: lazy(() => import("../pages/auth/RegisterPage")),
    exact: false,
  },
  withdraw: {
    path: "/auth/withdraw",
    component: lazy(() => import("../pages/auth/withdrawPage")),
    exact: false,
  },
  usersDetail: {
    path: "/users/detail",
    component: lazy(() => import("../pages/users/UsersDetailPage")),
    exact: false,
  },
  usersOrder: {
    path: "/users/orders",
    component: lazy(() => import("../pages/users/UsersOrdersPage")),
    exact: false,
  },
  // productsList -> products
  productsList: {
    path: "/products",
    component: lazy(() => import("../pages/products/ProductsPage")),
    exact: true,
  },
  newProducts: {
    path: "/products/new",
    component: lazy(() => import("../pages/products/ProductsAddPage")),
    exact: true,
  },
  // productsDetail: {
  //   path: "/products/:id",
  //   component: lazy(() => import("../pages/products/ProductsDetailPage")),
  //   exact: true,
  // },
  // TODO : 카테고리별 제품 조회 경로 확인
  productsByCategoryId: {
    path: "/products/:categoryId",
    component: lazy(() => import("../pages/products/ProductsByCategoryIdPage")),
    exact: false,
  },
  // cartList -> /users/cart
  cart: {
    path: "/cart",
    component: lazy(() => import("../pages/users/UsersCartPage")),
    exact: true,
  },
  newOrder: {
    path: "/users/new-order",
    component: lazy(() => import("../pages/users/UsersNewOrderPage")),
    exact: true,
  },
  shimmerTest: {
    path: "/test/shimmer",
    component: lazy(() => import("../pages/ShimmerTestPage")),
    exact: true,
  },
  wrong: {
    path: "/errors/wrong",
    component: lazy(() => import("../pages/errors/WrongPage")),
    exact: true,
  },
  404: {
    path: "/errors/404",
    component: lazy(() => import("../pages/errors/NotFoundPage")),
    exact: false,
  },
  notFound: {
    path: "*",
    component: lazy(() => import("../pages/errors/NotFoundPage")),
    exact: false,
  },
};
