import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { router } from "./router/router.jsx";
import LoadingState from "./components/ui/LoadingState.jsx";

import "./styles/toaster.scss";

function App() {
  return (
    <>
      <Suspense fallback={<LoadingState />}>
        <RouterProvider router={router} />
      </Suspense>

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3500,
          className: "stratusse-toast stratusse-toast-info",
          success: {
            className: "stratusse-toast stratusse-toast-success",
          },
          error: {
            className: "stratusse-toast stratusse-toast-error",
          },
        }}
      />
    </>
  );
}

export default App;
