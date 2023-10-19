import { useState, useEffect } from "react";
import { fetchCategories } from "../api/category";
import { CategoryModel } from "../models";

// interface UseCategoriesProps {
//   categories: string;
// }

export function useCategories() {
  const [categories, setCategories] = useState<CategoryModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>("");

  async function _fetchCategories() {
    setIsLoading(true);
    try {
      const categories = await fetchCategories();
      setCategories(categories);
    } catch (err) {
      if (err instanceof Error) setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    _fetchCategories();
  }, []);

  return { categories, isLoading, error };
}
