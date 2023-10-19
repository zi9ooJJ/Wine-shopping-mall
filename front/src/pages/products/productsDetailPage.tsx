import { useState } from "react";
import { ProductDetailItem, Column } from "../../components";
import { Helmet } from "react-helmet-async";
import { fetchProducts } from "../../api/products";

const ProductsDetailPage = () => {
  let products;
  // useEffect(()=>{axios
  //   .get("http://localhost:8080/api/products")
  //   .then((data) => (produtcs = data));}, [])
  // let productData = products.map((elem, i)=>{
  //   prodId: elem._id,
  //   prodImageUrl: elem.imageUrl,
  //   prodName: elem.name,
  //   updatedAt: elem.updatedAt
  // })

  const [product, setProduct] = useState<any>({
    prodId: "ee1c3f53-73f2-4330-89ac-ae62bce1d7d8",
    prodImageUrl: "https://loremflickr.com/640/480/fashion",
    prodName: "Annie",
    updatedAt: "2023-03-04T08:15:05.879Z",
  });

  return (
    <div>
      <Helmet>
        <title>상품상세정보</title>
      </Helmet>
      <Column maxWidth={700}>
        ProductDetailPage
        <ProductDetailItem
          name={product.prodName}
          price={product.price}
          imageUrl={product.prodImageUrl}
          alt={product.prodName}
        />
      </Column>
    </div>
  );
};

export default ProductsDetailPage;
