import { Helmet } from "react-helmet-async";
import { ManyShimmers, ProductCardsContainer } from "../../components";
import { useProductsByCategoryId } from "../../hooks";
import { useParams } from "react-router-dom";

interface UseParamsProps {
  categoryId: string;
}
const ProductsByCategoryIdPage = () => {
  const { categoryId } = useParams<UseParamsProps>();

  const { isLoading, products, selectedCategory } = useProductsByCategoryId({
    categoryId,
  });

  if (isLoading) {
    return <ManyShimmers />;
  }

  return (
    <>
      <Helmet>
        <title>상품페이지</title>
      </Helmet>

      <div className="w-full flex flex-col items-center">
        <div>{selectedCategory}</div>
        <ProductCardsContainer products={products} />
      </div>
    </>
  );
};

export default ProductsByCategoryIdPage;
