import { Link } from "react-router-dom";
import { routes } from "../../config/routes";

// 로그인 안 되었을 때 Header 오른쪽에 보여줄 패널
export const LoggedOutPanel = () => {
  return (
    <div className="mr-2 absolute right-2">
      <Link to={routes.login.path}>
        <div className="text-lg mr-3 font-bold hover:opacity-40">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
            로그인
          </span>
        </div>
      </Link>
      <Link to={routes.register.path}>
        <div className="text-lg mr-3 font-bold hover:opacity-40">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
            회원가입
          </span>
        </div>
      </Link>
    </div>
  );
};
