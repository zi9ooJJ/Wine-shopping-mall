const { Product } = require("./models/productModel");

const productDAO = {
  // 전체 상품 조회 - Any
  async findAll() {
    const products = await Product.find({}).lean();
    return products;
  },
  // 개별 상품 상세 조회 - Any
  async findOne(id) {
    const productDetail = await Product.findById(id).lean();
    return productDetail;
  },
  // 카테고리별 상품 목록 조회 - Any
  async findAllByCategoryId(categoryId) {
    const products = await Product.find({ categoryId }).lean();
    return products;
  },
  // 상품 등록 - Admin
  async create({ name, categoryId, imageUrl, price, description, producer }) {
    const product = new Product({
      name,
      categoryId,
      imageUrl,
      price,
      description,
      producer,
    });
    await product.save(); // 데이터 스키마 구성 검증
    return product.toObject();
  },
  // 상품 수정 - Admin
  async updateOne(
    id,
    { name, categoryId, imageUrl, price, description, producer }
  ) {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        name,
        categoryId,
        imageUrl,
        price,
        description,
        producer,
      },
      { new: true } // put(update)했을 때 받는 값이 이전 값이 아닌 새로운 값으로 보이게 함.
    ).lean();
    return updatedProduct;
  },
  // 상품 삭제 - Admin
  async deleteOne(id) {
    const result = await Product.findByIdAndDelete({ _id: id }).lean();
    return result;
  },
};

module.exports = productDAO;
