import { Link, useHistory } from "react-router-dom";
import { useAuthUser } from "../hooks";
// import "bootstrap/dist/css/bootstrap.min.css";
import { Helmet } from "react-helmet-async";
import { ManyShimmers, Shimmer } from "../components";

const HomePage = () => {
  const { authUser, isLoading, error } = useAuthUser();
  const history = useHistory();
  // 사용자 데이터를 가져오는 중
  if (isLoading) {
    return <ManyShimmers />;
  }
  if (error) {
    history.push("/errors/wrong");
    return <></>;
  }

  // 로그인 됨
  return (
    <div
      className="bg-cover hero min-h-screen"
      style={{
        // backgroundImage: `url("https://sonomawinegarden.com/wp-content/uploads/2022/08/Popular-Types-of-Red-Wine.jpg")`,
        backgroundImage: `url("home-background-image.jpeg")`,
      }}
    >
      <Helmet>
        <title>Wine-Shop🍷</title>
      </Helmet>
      <div className="hero-overlay bg-opacity-70"></div>
      <div className="hero-content text-center text-neutral-200">
        <div className="max-w-none">
          <h1 className="mb-5 text-5xl font-bold">안녕하세요 🙇‍♀️</h1>
          <p className="mb-5">WINESHOP에 오신걸 환영합니다</p>
          <Link to="/products">
            <button className="border-0 btn btn-active btn-secondary">
              상품 보러가기
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
