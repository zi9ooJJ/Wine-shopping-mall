import { Helmet } from "react-helmet-async";

const LogoutPage = () => {
  return (
    <>
      <Helmet>
        <title>로그아웃</title>
      </Helmet>
      <div className="alert shadow-lg">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="stroke-info flex-shrink-0 w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <span>정상적으로 로그아웃 되었습니다.</span>
        </div>
      </div>
    </>
  );
};

export default LogoutPage;
