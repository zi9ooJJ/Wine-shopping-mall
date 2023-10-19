const { Order } = require("./models/orderModel");

const orderDAO = {
  //사용자에게 입력받은 값이 create에 인자로 들어오는 값
  //주문 생성
  async create({
    productId,
    ordererId,
    address,
    quantity,
    totalPrice,
    status,
  }) {
    const order = new Order({
      productId,
      ordererId,
      address,
      quantity,
      totalPrice,
      status,
    });
    await order.save();
    return order.toObject();
  },
  //주문자(orderer) 주문 딱 하나
  async findOne(id) {
    const order = await Order.findById(id).lean();
    return order;
  },
  //주문자(orderer) 주문 여러 개 & 주문자 상관없이 전체 주문 조회
  async find(filter) {
    const orderList = await Order.find(filter).lean();
    return orderList;
  },
  //주문자 배송지 수정
  async updateOne(id, { address }) {
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { address },
      { new: true } // put(update)했을 때 받는 값이 이전 값이 아닌 새로운 값으로 보이게 함.
    ).lean();
    return updatedOrder;
  },
  //관리자 주문 수정
  async updateOneByAdmin(id, { address, productId, status }) {
    const updatedOrderByAdmin = await Order.findByIdAndUpdate(
      id,
      {
        address,
        productId,
        status,
      },
      { new: true }
    ).lean();
    return updatedOrderByAdmin;
  },
  //개별 주문 삭제 및 관리자 주문 삭제
  async deleteOne(id) {
    const deletedOrder = await Order.findByIdAndDelete({ _id: id }).lean();
    return deletedOrder;
  },
};

module.exports = orderDAO;
