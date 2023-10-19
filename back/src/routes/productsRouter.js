const { Router } = require("express");
const { productController } = require("../controllers");
const productMiddleware = require("../middlewares/productMiddleware");

const productRouter = Router();

// 전체 상품 조회 (GET /products)
// 카테고리별 상품 목록 조회 (GET /products?categoryId={categoryId}) -> query string 방식으로 조회하면 됨.
productRouter.get("/", productController.getProducts);

// 개별 상품 상세 조회 (GET /products/{id = 제품의 id값임.})
productRouter.get(
  "/:id",
  productMiddleware.checkProductIdFrom("params"),
  productController.getProductDetail
);

module.exports = productRouter;
