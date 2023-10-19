export enum OrderErrorMessage {
  NotInputInfo = "팔수 값을 입력해주세요",
  LessThanZero = "상품 가격이 0원 미만입니다",
  ReInputAddress = "주소를 다시 입력해주세요",
  InvalidOrder = "존재하지 않는 주문정보입니다",
}

export enum OrderErrorCode {
  NotInputInfo = 0x00, // 3~7
  LessThanZero = 8,
  ReInputAddress = 9,
  InvalidOrder = 0x00,
}

export function intoOrderError(err: OrderErrorCode) {
  switch (err) {
    case OrderErrorCode.NotInputInfo:
      return new Error(OrderErrorMessage.NotInputInfo);
    case OrderErrorCode.LessThanZero:
      return new Error(OrderErrorMessage.LessThanZero);
    case OrderErrorCode.ReInputAddress:
      return new Error(OrderErrorMessage.ReInputAddress);
    case OrderErrorCode.InvalidOrder:
      return new Error(OrderErrorMessage.InvalidOrder);
  }
}
