const { Router } = require("express");
const {
  categoryController,
  productController,
  orderController,
  authController,
} = require("../controllers");
const orderMiddleware = require("../middlewares/orderMiddleware");
const adminRouter = Router();
const isAdmin = require("../middlewares/isAdmin");
const { categoryMiddleware, productMiddleware } = require("../middlewares");

adminRouter.use(isAdmin); // ! admin 검증

adminRouter.post("/users", async (req, res, next) => {
  await authController.getUsers(req, res, next); // & role만 입력
});

// adminRouter.get("/admin/orders", (req, res) => {
//   res.json("관리자 전체주문내역 조회 페이지입니다.");
// });
// 관리자 전체 주문 정보 조회 (GET /admin/order) 쿼리 파라미터 적용 시  사용자별로 주문 정보 조회 가능
adminRouter.get("/orders", orderController.getOrders);

//관리자 개별 상품 주문 수정
adminRouter.put(
  "/orders/:id",
  orderMiddleware.checkModifiedOrderByAdminFrom("body"),
  orderController.putOrderByAdmin
);

//관리자 개별 상품 주문 삭제
adminRouter.delete(
  "/orders/:id",
  orderMiddleware.checkCompleteOrderIdFrom("params"),
  orderMiddleware.checkCompleteStatusFrom("body"),
  orderController.deleteOrder
);

// 새로운 카테고리 생성 (POST /admin/category)
adminRouter.post(
  "/category",
  categoryMiddleware.checkCategoryNameFrom("body"),
  categoryMiddleware.checkCategoryFrom("body"),
  categoryController.postCategory
);
// 카테고리 수정 (PUT /admin/category/:id)
adminRouter.put(
  "/category/:id",
  categoryMiddleware.checkCategoryIdFrom("params"),
  categoryMiddleware.checkCategoryNameFrom("body"),
  categoryMiddleware.checkCategoryFrom("body"),
  categoryController.putCategory
);
// 카테고리 삭제 (DELETE /admin/category/:id)
adminRouter.delete(
  "/category/:id",
  categoryMiddleware.checkCategoryIdFrom("params"),
  categoryController.deleteCategory
);

// 상품 등록 (POST /admin/products)
adminRouter.post(
  "/products",
  productMiddleware.checkCompleteProductFrom("body"),
  productController.postProduct
);
// 상품 수정 (PUT /admin/products/{id})
adminRouter.put(
  "/products/:id",
  productMiddleware.checkProductIdFrom("params"),
  productMiddleware.checkCompleteProductFrom("body"),
  productController.putProduct
);
// 상품 삭제 (DELETE /admin/products/{id})
adminRouter.delete(
  "/products/:id",
  productMiddleware.checkProductIdFrom("params"),
  productController.deleteProduct
);

module.exports = adminRouter;
