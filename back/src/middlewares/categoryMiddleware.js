const { categoryDAO } = require("../data-access");
const AppError = require("../misc/AppError");
const commonErrors = require("../misc/commonErrors");

const checkCategoryIdFrom = (from) => async (req, res, next) => {
  const { id } = req[from];
  const categoryId = await categoryDAO.findOne(id);
  if (categoryId === undefined || categoryId === null) {
    next(
      new AppError(
        commonErrors.inputError,
        400,
        20,
        `${from}: 존재하지 않는 id입니다.`
      )
    );
    return;
  }
  next();
};

const checkCategoryNameFrom = (from) => async (req, res, next) => {
  const { name } = req[from];
  const newName = await categoryDAO.existCategory(name);
  if (newName) {
    next(
      new AppError(
        commonErrors.inputError,
        400,
        19,
        `${from}: 중복된 category 이름입니다.`
      )
    );
    return;
  }
  next();
};

const checkCategoryFrom = (from) => (req, res, next) => {
  const { name, description } = req[from];
  if (name === undefined || name === null || name.length <= 1) {
    next(
      new AppError(
        commonErrors.inputError,
        400,
        17,
        `${from}: name은 필수 값입니다.`
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
        18,
        `${from}: description은 필수 값입니다.`
      )
    );
    return;
  }
  next();
};

module.exports = {
  checkCategoryFrom,
  checkCategoryNameFrom,
  checkCategoryIdFrom,
};
