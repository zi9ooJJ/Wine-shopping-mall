export enum ProductsErrorMessage {
  InvalidProducts = "존재하지 않는 상품정보입니다",
  NotInputInfo = "필수 값을 입력해주세요",
  LessThanZero = "총 합계금액이 0 미만입니다",
  NotInputAddress = "주소를 다시 입력해주세요",
}

export enum ProductsErrorCode {
  InvalidProducts = 2,
  NotInputInfo = 0x00, //TODO: 3~7
  LessThanZero = 8,
  NotInputAddress = 9,
}

export function intoProductsError(err: ProductsErrorCode) {
  switch (err) {
    case ProductsErrorCode.InvalidProducts:
      return new Error(ProductsErrorMessage.InvalidProducts);
    case ProductsErrorCode.NotInputInfo:
      return new Error(ProductsErrorMessage.NotInputInfo);
    case ProductsErrorCode.LessThanZero:
      return new Error(ProductsErrorMessage.LessThanZero);
    case ProductsErrorCode.NotInputAddress:
      return new Error(ProductsErrorMessage.NotInputAddress);
  }
}
