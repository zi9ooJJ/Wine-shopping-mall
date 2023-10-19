import ReactDOM from "react-dom/client";
import "./styles/output.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { StrictMode, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "./components";

const Loading = () => <div>Loading!!!!APP!!!</div>;
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

// TODO: GlobalErrorBoundary
root.render(
  <BrowserRouter>
    <ErrorBoundary fallback={<ErrorFallback />}>
      <Suspense fallback={<Loading />}>
        <App />
      </Suspense>
    </ErrorBoundary>
  </BrowserRouter>
);
