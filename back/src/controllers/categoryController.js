const { categoryService } = require("../service");
const util = require("../misc/util");

const categoryController = {
  // 카테고리 get - Any
  async getCategories(req, res, next) {
    try {
      const categories = await categoryService.getCategories();
      res.status(200).json(util.buildResponse(categories, null, 200));
    } catch (error) {
      next(error);
    }
  },
  // 카테고리 post - Admin
  async postCategory(req, res, next) {
    try {
      const { name, description } = req.body;
      const category = await categoryService.createCategory({
        name,
        description,
      });
      res.status(201).json(util.buildResponse(category, null, 201));
    } catch (error) {
      next(error);
    }
  },
  // 카테고리 put - Admin
  async putCategory(req, res, next) {
    try {
      const { id } = req.params;
      const { name, description } = req.body;
      const category = await categoryService.updateCategory(id, {
        name,
        description,
      });
      res.status(200).json(util.buildResponse(category, null, 200));
    } catch (error) {
      next(error);
    }
  },
  // 카테고리 delete - Admin
  async deleteCategory(req, res, next) {
    try {
      const { id } = req.params;
      await categoryService.deleteCategory(id);
      res.status(204).json(util.buildResponse(null, null, 204));
    } catch (error) {
      next(error);
    }
  },
};

module.exports = categoryController;
