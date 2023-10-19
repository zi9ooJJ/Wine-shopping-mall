import { Link } from "react-router-dom";
import { useAuthUser, useCart } from "../../hooks";
import { routes } from "../../config/routes";
import { LoggedOutPanel } from "./LoggedOutPanel";
import { LoggedInPanel } from "./LoggedInPanel";
import { ZzangBaguni } from "./ZzangBaguni";

export const Header = () => {
  const { authUser, isLoading } = useAuthUser();
  const { cart } = useCart();
  return (
    <header className="fixed w-full z-50">
      <div className="flex justify-between items-center navbar bg-neutral text-neutral-content w-full h-24 backdrop-blur-3xl bg-opacity-80">
        <>
          <button className="btn btn-ghost ml-2">
            <Link to={routes.home.path}>
              <div className="animate-pulse text-3xl font-extrabold">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
                  WINESHOP
                </span>
              </div>
            </Link>
          </button>

          {isLoading ? (
            <div>Loading...</div>
          ) : authUser === null || authUser === undefined ? (
            <LoggedOutPanel />
          ) : (
            <>
              <LoggedInPanel
                name={authUser!.name}
                profilePhotoUrl="data:image/jpeg;base64,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"
              />
              <ZzangBaguni count={cart.length} />
            </>
          )}
        </>
      </div>
    </header>
  );
};
