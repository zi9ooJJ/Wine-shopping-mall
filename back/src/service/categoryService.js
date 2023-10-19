const { categoryDAO } = require("../data-access");

const categoryService = {
  // 모든 카테고리 조회(GET /category)
  async getCategories() {
    const categories = await categoryDAO.findAll();
    return categories;
  },
  // 카테고리 생성 - Admin
  async createCategory({ name, description }) {
    const createdCategory = await categoryDAO.create({ name, description });
    return createdCategory;
  },
  // 카테고리 수정 - Admin
  async updateCategory(id, { name, description }) {
    const updatedCategory = await categoryDAO.updateOne(id, {
      name,
      description,
    });
    return updatedCategory;
  },
  // 카테고리 삭제 - Admin
  async deleteCategory(id) {
    const deletedCategory = await categoryDAO.deleteOne(id);
    return deletedCategory;
  },
};

module.exports = categoryService;
