import { toPriceString } from "../utils";
import { Card } from "./Card";
import "./ProductDetailItem.css";

interface ProductDetailItemProps {
  imageUrl: string;
  name: string;
  alt: string;
  price: number;
}

export const ProductDetailItem = ({
  imageUrl,
  name,
  alt,
  price,
}: ProductDetailItemProps) => {
  return (
    <Card>
      <img className="product-item-img" src={imageUrl} alt={alt} />
      <div className="product-item-name">{name}</div>
      <div className="product-item-price">{toPriceString(price)}</div>
      {/* X(backward) 
            image
            name
            price
            Buy/AddCart Button
        */}
      <li className="product-item">
        <button className="ber" onClick={() => {}}>
          주문하기
        </button>
        <div className="product-item-container">
          {/* Link to 백엔드 맞춰서 수정 필요 */}
          {/* <Link to={`/products/${name}`}> */}
          {/* </Link> */}
          <div className="product-item-below "></div>
        </div>
      </li>
    </Card>
  );
};
