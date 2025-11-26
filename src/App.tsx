import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./router/router";
import { useDispatch, useSelector } from "react-redux";
import type { AppState } from "./redux/store";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { clearToast } from "./redux/features/ToastSlice";

function App() {
  const toaster = useSelector(({ toast }: AppState) => toast);
  const dispatch = useDispatch();

  useEffect(() => {
    if (toaster.message) {
      toast(toaster.message, {
        type: toaster.type,
      });
      dispatch(clearToast());
    }
  }, [dispatch, toaster]);

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}

export default App;
