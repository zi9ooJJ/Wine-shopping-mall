import { Helmet } from "react-helmet-async";
import { ManyShimmers, ProductCardsContainer, Shimmer } from "../../components";
import { useProducts } from "../../hooks/useProducts";
import { useCart } from "../../hooks";

// TODO: 테스트, 코드 전체 변경 요망
const ProductsPage = () => {
  const { isLoading, products } = useProducts();

  if (isLoading) {
    return <ManyShimmers />;
  }
  return (
    <>
      <Helmet>
        <title>상품페이지</title>
      </Helmet>
      <ProductCardsContainer products={products} />
    </>
  );
};

export default ProductsPage;
