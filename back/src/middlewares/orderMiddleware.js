const orderDAO = require("../data-access/orderDAO");
const AppError = require("../misc/AppError");
const commonErrors = require("../misc/commonErrors");

//from값이 req.바디인지 path인지 param인지 체크
const checkCompleteOrderFrom = (from) => (req, res, next) => {
  const { productId, ordererId, address, quantity, totalPrice, status } =
    req[from]; //부분함수;
  if (productId === undefined || productId === null) {
    next(
      new AppError(
        commonErrors.inputError,
        400,
        3,
        `${from}: productId는 필수값입니다.`
      )
    );
    return; //밑에 17번 next()가 불릴 가능성이 있음
  }
  if (ordererId === undefined || ordererId === null) {
    next(
      new AppError(
        commonErrors.inputError,
        400,
        4,
        `${from}: ordererId는 필수값입니다.`
      )
    );
    return;
  }
  if (address === undefined || address === null || address === "") {
    next(
      new AppError(
        commonErrors.inputError,
        400,
        5,
        `${from}: address은 필수값입니다.`
      )
    );
    return;
  }
  if (quantity === undefined || quantity === null || quantity <= 0) {
    next(
      new AppError(
        commonErrors.inputError,
        400,
        6,
        `${from}: quantity은 필수값입니다.`
      )
    );
    return;
  }
  if (totalPrice === undefined || totalPrice === null) {
    next(
      new AppError(
        commonErrors.inputError,
        400,
        7,
        `${from}: totalPrice은 필수값입니다.`
      )
    );
    return;
  }
  if (totalPrice <= 0) {
    next(
      new AppError(
        commonErrors.inputError,
        400,
        8,
        `${from}: totalPrice가 0이하입니다.`
      )
    );
    return;
  }
  // if (status === undefined || status === null) {
  //   next(
  //     new AppError(
  //       commonErrors.inputError,
  //       400,
  //       `${from}: status값은 필수값입니다.`
  //     )
  //   );
  //   return;
  // }
  // if (status !== "pending") {
  //   next(
  //     new AppError(
  //       commonErrors.inputError,
  //       400,
  //       `${from}: pending상태가 맞는 지 확인해 주십시오.`
  //     )
  //   );
  //   return;
  // }
  next();
};
const checkCompleteOrderIdFrom = (from) => async (req, res, next) => {
  const { id } = req[from];
  const orderId = await orderDAO.findOne(id);
  if (orderId === null) {
    next(
      new AppError(
        commonErrors.inputError,
        400,
        2,
        `${from}:  존재하지 않는 id입니다.`
      )
    );
    return;
  }
  next();
};

// const checkCompleteOrdererIdFrom = (from) => async (req, res, next) => {
//   const { ordererId } = req[from];
//   const ordererId = await orderDAO.find(filter);
//   if (ordererId === null) {
//     next(
//       new AppError(
//         commonErrors.inputError,
//         400,
//         `${from}:  존재하지 않는 ordererId입니다.`
//       )
//     );
//     return;
//   }
//   next();
// };

const checkModifiedOrderByAdminFrom = (from) => (req, res, next) => {
  const { address, productId, status } = req[from];
  if (address === undefined || address === null || address === "") {
    next(
      new AppError(
        commonErrors.inputError,
        400,
        21,
        `${from}: address 수정이 필요합니다.`
      )
    );
    return;
  }
  if (productId === undefined || productId === null) {
    next(
      new AppError(
        commonErrors.inputError,
        400,
        22,
        `${from}: productId 수정이 필요합니다.`
      )
    );
    return;
  }
  if (status === undefined || status === null || status === "") {
    next(
      new AppError(
        commonErrors.inputError,
        400,
        23,
        `${from}: status 수정이 필요합니다.`
      )
    );
    return;
  }
  next();
};

const checkModifiedOrderFrom = (from) => (req, res, next) => {
  const { address } = req[from];
  if (address === undefined || address === null || address === "") {
    next(
      new AppError(
        commonErrors.inputError,
        400,
        9,
        `${from}: address 수정이 필요합니다.`
      )
    );
    return;
  }
  next();
};

const checkCompleteStatusFrom = (from) => (req, res, next) => {
  const { status } = req[from];
  if (status !== "pending") {
    next(
      new AppError(
        commonErrors.inputError,
        400,
        39,
        `${from}: pending상태가 맞는 지 확인해 주십시오.`
      )
    );
    return;
  }
  next();
};

module.exports = {
  checkCompleteOrderFrom,
  checkCompleteOrderIdFrom,
  checkModifiedOrderFrom,
  checkModifiedOrderByAdminFrom,
  checkCompleteStatusFrom,
  // checkCompleteOrdererIdFrom,
};
