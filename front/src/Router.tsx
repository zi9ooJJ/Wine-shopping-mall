import { Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import { ErrorFallback, Layout, ManyShimmers } from "./components";
import { routes } from "./config/routes";
import { ErrorBoundary } from "react-error-boundary";

const Router = () => {
  const routesValues = Object.values(routes);

  // lazy(() => import('./component-path'))
  // index.js에 작성된 모든 컴포넌트를 합쳐서 하나의 파일로 만드는 것이 아니라,
  // 여러 개의 파일로 미리 쪼개놓고,(splitting) 컴포넌트가 실행될 때마다 요청을 보내서 .js 파일을 가져옴
  // 메모리 절약, 네트워크 절약, 로딩 시간 절약 등등 어쩌고 나중에 정리!

  // [P1, ()=>P2, P3, ()=>{}];
  // [100MB, 200MB, 10MB, 40MB, 4GB, 2GB]
  // index.html
  // [index.js]
  // [index.js, users.js, Products.js, order.js, auth.js]
  return (
    <Switch>
      {routesValues.map((route) => {
        return (
          <Route
            key={route.path}
            path={route.path}
            component={route.component}
            exact={route.exact}
          />
        );
      })}
    </Switch>
  );
};

export default Router;
