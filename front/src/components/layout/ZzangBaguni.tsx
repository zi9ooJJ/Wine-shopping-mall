import { Link } from "react-router-dom";
import { routes } from "../../config/routes";
import { useCart } from "../../hooks";

interface ZzangBaguniProps {
  count: number;
}

export const ZzangBaguni = ({ count }: ZzangBaguniProps) => {
  return (
    <Link to={routes.cart.path}>
      <button className="btn btn-ghost mr-2">
        <div className="flex flex-col p-2 animate-bounce font-bold scale-150">
          <div className="bg-clip-text text-transparent bg-gradient-to-r from-sky-600 to-green-400">
            <span className="material-icons">shopping_cart</span>
          </div>
        </div>
        <div className="badge badge-secondary">+{count}</div>
      </button>
    </Link>
  );
};
