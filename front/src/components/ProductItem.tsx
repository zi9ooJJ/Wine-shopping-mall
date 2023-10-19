import { Link } from "react-router-dom";
import "./ProductItem.css";

interface ProductItemArgs {
  imageUrl: string;
  name: string;
  price: number;
  alt: string;
}

export const ProductItem = ({
  name,
  price,
  imageUrl,
  alt,
}: ProductItemArgs) => {
  return (
    // TODO: temp key
    <li className="product-item" key={name}>
      <div>
        {/* Link to 백엔드 맞춰서 수정 필요 */}
        <Link to={`/products/${name}`}>
          <img className="product-item-img" src={imageUrl} alt={alt} />
        </Link>
        <div className="product-item-below ">
          <div className="product-item-name">{name}</div>
          <div className="product-item-price">
            {price.toLocaleString("ko-KR")}원
          </div>
        </div>
      </div>
    </li>
  );
};
