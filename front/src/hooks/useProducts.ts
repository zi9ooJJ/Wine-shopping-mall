import { useState, useEffect } from "react";
import { fetchProducts } from "../api/products";
import { ProductModel } from "../models";

export function useProducts() {
  const [products, setProducts] = useState<ProductModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>("");

  async function _fetchProducts() {
    setIsLoading(true);
    try {
      const products = await fetchProducts();

      setProducts(products);
    } catch (err) {
      if (err instanceof Error) setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    _fetchProducts();
  }, []);

  return { products, isLoading, error };
}
