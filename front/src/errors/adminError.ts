export enum AdminErrorMessage {
  LessThanZero = "판매금액은 0보다 커야 합니다",
  NotInputInfo = "필수 값을 입력해주세요",
  MoreThanZero = "가격은 0원 보다 커야합니다",
  InvalidProduct = "존재하지 않는 상품정보입니다",
  //
  NotInputName = "카테고리명은 필수 값 입니다",
  DuplicateName = "이미 등록된 카테고리입니다",
  NotFoundCategory = "존재하지 않는 카테고리입니다",
  //
  ReInputAddress = "주소를 다시 입력해주세요",
  ReInputProduct = "상품정보를 다시 입력해주세요",
  InvalidStatus = "status를 다시 입력해주세요",
  InvalidOrder = "존재하지 않는 주문정보입니다",
  //
  NotFoundUser = "존재하지 않는 회원입니다",
}

export enum AdminErrorCode {
  LessThanZero = 16,
  NotInputInfo = 0x00, // 10~15
  MoreThanZero = 16,
  InvalidProduct = 1,
  //
  NotInputName = 0x00, // 17~18
  DuplicateName = 19,
  NotFoundCategory = 20,
  //
  ReInputAddress = 21,
  ReInputProduct = 22,
  InvalidStatus = 23,
  InvalidOrder = 2,
  //
  NotFoundUser = 31,
}

export function intoAdminError(err: AdminErrorCode) {
  switch (err) {
    case AdminErrorCode.LessThanZero:
      return new Error(AdminErrorMessage.LessThanZero);
    case AdminErrorCode.NotInputInfo:
      return AdminErrorMessage.NotInputInfo;
    case AdminErrorCode.MoreThanZero:
      return AdminErrorMessage.MoreThanZero;
    case AdminErrorCode.InvalidProduct:
      return new Error(AdminErrorMessage.InvalidProduct);
    case AdminErrorCode.NotInputName:
      return new Error(AdminErrorMessage.NotInputName);
    case AdminErrorCode.DuplicateName:
      return new Error(AdminErrorMessage.DuplicateName);
    case AdminErrorCode.NotFoundCategory:
      return new Error(AdminErrorMessage.NotFoundCategory);
    case AdminErrorCode.ReInputAddress:
      return new Error(AdminErrorMessage.ReInputAddress);
    case AdminErrorCode.ReInputProduct:
      return new Error(AdminErrorMessage.ReInputProduct);
    case AdminErrorCode.InvalidStatus:
      return new Error(AdminErrorMessage.InvalidStatus);
    case AdminErrorCode.InvalidOrder:
      return new Error(AdminErrorMessage.InvalidOrder);
    case AdminErrorCode.NotFoundUser:
      return new Error(AdminErrorMessage.NotFoundUser);
  }
}
