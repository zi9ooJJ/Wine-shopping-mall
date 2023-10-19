import { Helmet } from "react-helmet-async";
import { routes } from "../../config/routes";
import { Link } from "react-router-dom";

export const ErrorFallback = () => {
  return (
    <>
      <Helmet>
        <title>Something Wrong</title>
      </Helmet>
      <div className="flex justify-center items-center w-10/12 h-[70vh]">
        <div className="grid h-20 flex-grow card bg-base-300 rounded-box place-items-center">
          <div>오류가 발생했습니다.</div>
          <br />
          자세한 사항은 고객센터로 신고 바랍니다.(☎️112)
          <>
            <Link to={routes.home.path}>
              <button className="mt-10 border-0 btn btn-active btn-secondary bg-gradient-to-r from-pink-500 to-violet-500">
                홈페이지로 이동
              </button>
            </Link>
          </>
        </div>
      </div>
    </>
  );
};
