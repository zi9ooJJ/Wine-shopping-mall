import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProductsByCategoryId } from "../api/products";
import { UnknownError } from "../errors";
import { ProductModel } from "../models";

interface UseProductsByCategoryIdProps {
  categoryId: string;
}

export function useProductsByCategoryId({
  categoryId,
}: UseProductsByCategoryIdProps) {
  const params = useParams();
  const [products, setProducts] = useState<ProductModel[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  async function _fetchProductsByCategoryId() {
    setIsLoading(true);
    try {
      const products = await fetchProductsByCategoryId({ categoryId });
      setProducts(products);
    } catch (error) {
      if (error instanceof UnknownError) {
        throw error;
      }
      setError(error as Error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    _fetchProductsByCategoryId();
  }, [params]);

  return {
    products,
    isLoading,
    error,
    selectedCategory,
    setSelectedCategory,
    fetchProductsByCategoryId: _fetchProductsByCategoryId,
  };
}
