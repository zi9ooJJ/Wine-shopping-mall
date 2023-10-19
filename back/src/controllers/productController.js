const { productService } = require("../service");
const util = require("../misc/util");

const productController = {
  // 전체 상품 조회 (GET /products)
  // 카테고리별 상품 목록 조회 (GET /products?categoryId={categoryId})
  async getProducts(req, res, next) {
    try {
      const { categoryId } = util.sanitizeObject(req.query);
      //! /products 뒤에 query parameter로 categoryId가 있을 경우 카테고리별 상품 목록 조회 실행
      if (categoryId !== undefined) {
        const products = await productService.getProductsByCategoryId(
          categoryId
        );
        return res.status(200).json(util.buildResponse(products, null, 200));
      }
      const products = await productService.getProducts();
      res.status(200).json(util.buildResponse(products, null, 200));
    } catch (error) {
      next(error);
    }
  },
  // 개별 상품 상세 조회 (GET /products/{id})
  async getProductDetail(req, res, next) {
    try {
      const { id } = req.params;
      const productDetail = await productService.getProduct(id);
      res.status(200).json(util.buildResponse(productDetail, null, 200));
    } catch (err) {
      next(err);
    }
  },
  // 상품 등록 (POST /admin/products)
  async postProduct(req, res, next) {
    try {
      const { name, categoryId, imageUrl, price, description, producer } =
        req.body;
      const product = await productService.createProduct({
        name,
        categoryId,
        imageUrl,
        price,
        description,
        producer,
      });
      res.status(201).json(util.buildResponse(product, null, 201));
    } catch (error) {
      next(error);
    }
  },
  // 상품 수정 (PUT /admin/products/{id})
  async putProduct(req, res, next) {
    try {
      const { id } = req.params;
      const { name, categoryId, imageUrl, price, description, producer } =
        req.body;
      const product = await productService.updateProduct(id, {
        name,
        categoryId,
        imageUrl,
        price,
        description,
        producer,
      });
      res.status(200).json(util.buildResponse(product, null, 200));
    } catch (error) {
      next(error);
    }
  },
  // 상품 삭제 (DELETE /admin/products/{id})
  async deleteProduct(req, res, next) {
    try {
      const { id } = req.params;
      await productService.deleteProduct(id);
      res.status(204).json(util.buildResponse(null, null, 204));
    } catch (error) {
      next(error);
    }
  },
};

module.exports = productController;
