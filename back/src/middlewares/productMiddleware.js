const AppError = require("../misc/AppError");
const commonErrors = require("../misc/commonErrors");
const { productDAO } = require("../data-access");

const checkProductIdFrom = (from) => async (req, res, next) => {
  const { id } = req[from];
  const productId = await productDAO.findOne(id);
  if (productId === undefined || productId === null) {
    next(
      new AppError(
        commonErrors.inputError,
        400,
        1,
        `${from}: 존재하지 않는 id입니다.`
      )
    );
    return;
  }
  next();
};

const checkCompleteProductFrom = (from) => (req, res, next) => {
  const { name, categoryId, imageUrl, price, description, producer } =
    req[from];
  if (name === undefined || name === null || name.length <= 1) {
    next(
      new AppError(
        commonErrors.inputError,
        400,
        10,
        `${from}: name은 필수 값입니다.`
      )
    );
    return;
  }
  if (
    categoryId === undefined ||
    categoryId === null ||
    categoryId.length <= 1
  ) {
    next(
      new AppError(
        commonErrors.inputError,
        400,
        11,
        `${from}: categoryId는 필수 값입니다.`
      )
    );
    return;
  }
  if (imageUrl === undefined || imageUrl === null || imageUrl.length <= 1) {
    next(
      new AppError(
        commonErrors.inputError,
        400,
        12,
        `${from}: imageUrl은 필수 값입니다.`
      )
    );
    return;
  }
  if (price === undefined) {
    next(
      new AppError(
        commonErrors.inputError,
        400,
        13,
        `${from}: prices는 필수 값입니다.`
      )
    );
    return;
  }
  if (price <= 0) {
    next(
      new AppError(
        commonErrors.inputError,
        400,
        16,
        `${from}: prices는 0보다 커야 합니다.`
      )
    );
    return;
  }
  if (
    description === undefined ||
    description === null ||
    description.length <= 1
  ) {
    next(
      new AppError(
        commonErrors.inputError,
        400,
        14,
        `${from}: description은 필수 값입니다.`
      )
    );
    return;
  }
  if (producer === undefined || producer === null || producer.length <= 1) {
    next(
      new AppError(
        commonErrors.inputError,
        400,
        15,
        `${from}: producer는 필수 값입니다.`
      )
    );
    return;
  }
  next();
};

module.exports = {
  checkProductIdFrom,
  checkCompleteProductFrom,
};
