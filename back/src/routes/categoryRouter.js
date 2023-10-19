const { Router } = require("express");
const { categoryController } = require("../controllers");

const categoryRouter = Router();

// 전체 카테고리 목록 불러오기
categoryRouter.get("/", categoryController.getCategories);

module.exports = categoryRouter;
