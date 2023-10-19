const orderDAO = require("../data-access/orderDAO");

const orderService = {
  //주문 생성
  async createOrder({
    productId,
    ordererId,
    address,
    quantity,
    totalPrice,
    status,
  }) {
    const createdOrder = await orderDAO.create({
      productId,
      ordererId,
      address,
      quantity,
      totalPrice,
      status,
    });
    return createdOrder;
  },
  //주문 하나 조회
  async getOrder(id) {
    const order = await orderDAO.findOne(id);
    return order;
  },
  //주문자가 주문한 모든 주문 조회 & 관리자- 전체 주문 조회
  async getOrders(filter) {
    const orders = await orderDAO.find(filter);
    return orders;
  },
  //주문자 배송지 수정
  async updateOrder(id, { address }) {
    //기존 주문 찾아오기
    const order = await orderDAO.findOne(id);
    if (order.status !== "pending") {
      console.log("펜딩 상태의 주문만 변경 가능");
      return;
    }
    const updatedOrder = await orderDAO.updateOne(id, {
      address,
    });
    return updatedOrder;
  },

  //관리자 주문 수정
  async updateOrderByAdmin(id, { address, productId, status }) {
    const updatedOrderByAdmin = await orderDAO.updateOneByAdmin(id, {
      address,
      productId,
      status,
    });
    return updatedOrderByAdmin;
  },
  //개별 주문 삭제 및 관리자 주문 삭제
  async deleteOrder(id) {
    const deletedOrder = await orderDAO.deleteOne(id);
    return deletedOrder;
  },
};

module.exports = orderService;
