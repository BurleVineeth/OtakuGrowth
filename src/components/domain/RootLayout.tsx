import { useDispatch, useSelector } from "react-redux";
import type { AppState } from "../../redux/store";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { clearToast } from "../../redux/features/ToastSlice";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
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
      <Outlet />
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
};

export default RootLayout;
