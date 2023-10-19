import { useState } from "react";
import { Link } from "../base/Link";
import { routes } from "../../config/routes";
import { useMutateAuthUser } from "../../hooks";
import { removeLocalStorageToken } from "../../utils";
import { useHistory } from "react-router-dom";
import {
  RED_WINE_OBJECT_ID,
  SPARKLING_WINE_OBJECT_ID,
  WHITE_WINE_OBJECT_ID,
} from "../../config/constants";

interface LoggedInPanelProps {
  profilePhotoUrl: string;
  name: string;
}

export const LoggedInPanel = ({
  name,
  profilePhotoUrl,
}: LoggedInPanelProps) => {
  const [isVisibleMenu, setIsVisibleMenu] = useState(false);

  return (
    <div
      className="btn btn-ghost cursor-pointer relative hover:animate-bounce"
      onClick={() => setIsVisibleMenu((prev) => !prev)}
    >
      <div className="text-lg">
        <div className="avatar">
          {/* 루피 동그란얼굴  */}
          <div className="w-14 rounded-full from-pink-600 to-purple-600">
            <img
              src={profilePhotoUrl}
              className="hover:opacity-80 active:opacity-100"
            />
          </div>
        </div>
      </div>
      <div className="absolute top-12 badge badge-accent bg-gradient-to-tr from-purple-800 to-pink-400 text-white text-xs">
        {name}님
      </div>
      {isVisibleMenu && <Menu />}
    </div>
  );
};

const Menu = () => {
  const logout = () => {
    removeLocalStorageToken();
    window.location.href = routes.home.path;
  };

  return (
    <nav className="menu bg-base-300 w-56 p-2 rounded-box absolute -left-20 top-16">
      <li>
        <Link to={routes.usersDetail.path}>
          <span className="material-icons">account_circle</span>내 정보
        </Link>
      </li>
      <li>
        <Link to={routes.usersOrder.path}>
          <div className="w-6 material-icons">favorites</div>주문 목록
        </Link>
      </li>
      <li>
        <Link to={`${routes.productsList.path}/${RED_WINE_OBJECT_ID}`}>
          <span className="material-icons">wine_bar</span>Red Wine
        </Link>
      </li>
      <li>
        <Link to={`${routes.productsList.path}/${WHITE_WINE_OBJECT_ID}`}>
          <span className="material-icons">wine_bar</span>White Wine
        </Link>
      </li>
      <li>
        <Link to={`${routes.productsList.path}/${SPARKLING_WINE_OBJECT_ID}`}>
          <span className="material-icons">local_bar</span>Sparkling Wine
        </Link>
      </li>
      <li>
        <div onClick={logout}>
          <span className="material-icons">logout</span>로그아웃
        </div>
      </li>
      <li>
        <Link to={routes.withdraw.path}>
          <span className="material-icons">fingerprint</span>회원탈퇴
        </Link>
      </li>
      <li>
        <Link to={routes.wrong.path}>
          <span className="text-xs material-icons"></span>WRONG Test
        </Link>
      </li>
      <li>
        <Link to={routes.shimmerTest.path}>
          <span className="text-xs material-icons"></span>Shimmer Test
        </Link>
      </li>
      <li>
        <Link to={routes["404"].path}>
          <span className="text-xs material-icons"></span>NOT FOUND Test
        </Link>
      </li>
    </nav>
  );
};
