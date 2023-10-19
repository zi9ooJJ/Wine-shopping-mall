const orderService = require("../service/orderService");
const util = require("../misc/util");

const orderController = {
  //주문 생성
  async postOrder(req, res, next) {
    try {
      const { productId, ordererId, address, quantity, totalPrice, status } =
        req.body;
      const order = await orderService.createOrder({
        productId,
        ordererId,
        address,
        quantity,
        totalPrice,
        status,
      });
      res.json(util.buildResponse(order, null, 200));
    } catch (error) {
      next(error);
    }
  },
  //주문 하나 조회
  async getOrder(req, res, next) {
    try {
      const { id } = req.params;
      const order = await orderService.getOrder(id);
      res.status(200).json(util.buildResponse(order, null, 200));
    } catch (error) {
      next(error);
    }
  },
  //주문자가 주문한 모든 주문 조회 & 관리자- 전체 주문 조회
  async getOrders(req, res, next) {
    try {
      const filter = util.sanitizeObject(req.query);
      const orders = await orderService.getOrders(filter);
      res.status(200).json(util.buildResponse(orders, null, 200));
    } catch (error) {
      next(error);
    }
  },
  //주문자 배송지 수정
  async putOrder(req, res, next) {
    try {
      const { id } = req.params;
      const { address } = req.body;
      const order = await orderService.updateOrder(id, {
        address,
      });
      res.status(200).json(util.buildResponse(order, null, 200));
    } catch (error) {
      next(error);
    }
  },
  //관리자 주문 수정
  async putOrderByAdmin(req, res, next) {
    try {
      const { id } = req.params;
      const { address, productId, status } = req.body;
      const order = await orderService.updateOrderByAdmin(id, {
        address,
        productId,
        status,
      });
      res.status(200).json(util.buildResponse(order, null, 200));
    } catch (error) {
      next(error);
    }
  },
  //개별 주문 삭제 및 관리자 주문 삭제
  async deleteOrder(req, res, next) {
    try {
      const { id } = req.params;
      await orderService.deleteOrder(id);
      res.status(204).json(util.buildResponse(null, null, 204));
    } catch (error) {
      next(error);
    }
  },
};

module.exports = orderController;
