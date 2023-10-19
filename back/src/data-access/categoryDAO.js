const { Category } = require("./models/categoryModel");

const categoryDAO = {
  // 모든 카테고리 조회 - Any
  async findAll() {
    const categories = await Category.find({}).lean();
    return categories;
  },
  // 새로운 카테고리 생성(추가) - Admin
  async create({ name, description }) {
    const category = new Category({ name, description });
    await category.save(); // 데이터가 스키마에 맞게 구성되어있는지 검증
    return category.toObject();
  },
  // 카테고리 수정 - Admin
  async updateOne(id, { name, description }) {
    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      {
        name,
        description,
      },
      { new: true } // put(update)했을 때 받는 값이 이전 값이 아닌 새로운 값으로 보이게 함.
    ).lean();
    return updatedCategory;
  },
  // 카테고리 삭제 - Admin
  async deleteOne(id) {
    const result = await Category.findByIdAndDelete({ _id: id }).lean();
    return result;
  },
  // 중복 카테고리 이름 조회
  async existCategory(name) {
    const category = await Category.findOne({ name }).lean();
    return category;
  },
  // 카테고리 Id로 조회
  async findOne(id) {
    const category = await Category.findOne({ _id: id }).lean();
    return category;
  },
};

module.exports = categoryDAO;
