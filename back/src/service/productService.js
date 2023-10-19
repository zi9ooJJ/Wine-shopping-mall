const { productDAO } = require("../data-access");

const productService = {
  // 전체 상품 조회 (GET /products)
  async getProducts() {
    const products = await productDAO.findAll({});
    return products;
  },
  // 개별 상품 상세 조회 (GET /products/{id})
  async getProduct(id) {
    const productDetail = await productDAO.findOne(id);
    return productDetail;
  },
  // 카테고리별 상품 목록 조회 (GET /products?categoryId={categoryId})
  async getProductsByCategoryId(categoryId) {
    const products = await productDAO.findAllByCategoryId(categoryId);
    return products;
  },
  // 상품 등록 (POST /admin/products)
  async createProduct({
    name,
    categoryId,
    imageUrl,
    price,
    description,
    producer,
  }) {
    const createdProduct = await productDAO.create({
      name,
      categoryId,
      imageUrl,
      price,
      description,
      producer,
    });
    return createdProduct;
  },
  // 상품 수정 (PUT /admin/products/{id})
  async updateProduct(
    id,
    { name, categoryId, imageUrl, price, description, producer }
  ) {
    const updatedProduct = await productDAO.updateOne(id, {
      name,
      categoryId,
      imageUrl,
      price,
      description,
      producer,
    });
    return updatedProduct;
  },
  // 상품 삭제 (DELETE /admin/products/{id})
  async deleteProduct(id) {
    const deletedProduct = await productDAO.deleteOne(id);
    return deletedProduct;
  },
};

module.exports = productService;
