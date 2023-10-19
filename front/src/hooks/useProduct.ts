import { useEffect, useState } from "react";
import { fetchProduct, FetchProductArg } from "../api/products";
import { ProductModel } from "../models";

export function useProduct({ productId }: FetchProductArg) {
  const [product, setProduct] = useState<ProductModel | null>(null);

  async function _fetchProduct() {
    try {
      const fetchedProduct = await fetchProduct({ productId });
      setProduct(fetchedProduct);
    } catch (err) {
      throw err;
    }
  }

  useEffect(() => {
    _fetchProduct();
  }, []);

  return { product };
}
