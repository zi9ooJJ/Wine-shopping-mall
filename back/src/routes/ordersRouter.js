const { Router } = require("express");

const orderController = require("../controllers/orderController");
const orderMiddleware = require("../middlewares/orderMiddleware");
const ordersRouter = Router();

//사용자 개별 상품 주문(db)
ordersRouter.post(
  "/",
  orderMiddleware.checkCompleteOrderFrom("body"), //check할 부분을 인자로 제공
  orderController.postOrder
);

// 사용자 주문 하나(objectId)정보 조회
ordersRouter.get(
  "/:id",
  orderMiddleware.checkCompleteOrderIdFrom("params"),
  orderController.getOrder
);

// (/orders?ordererId=1111) 쿼리 파라미터 적용 시  사용자가 주문한 모든 주문 정보 조회 가능
ordersRouter.get(
  "/",
  // orderMiddleware.checkCompleteOrdererIdFrom("query"),
  orderController.getOrders
);

//사용자 개별 상품 주문 수정
ordersRouter.put(
  "/:id",
  orderMiddleware.checkModifiedOrderFrom("body"),
  orderMiddleware.checkCompleteStatusFrom("body"),
  orderController.putOrder
);

// 사용자 개인 주문 취소
ordersRouter.delete(
  "/:id",
  orderMiddleware.checkCompleteOrderIdFrom("params"),
  orderMiddleware.checkCompleteStatusFrom("body"),
  orderController.deleteOrder
);

module.exports = ordersRouter;
