import { useDispatch, useSelector } from "react-redux";
import type { AppState } from "../../redux/store";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { clearToast } from "../../redux/features/ToastSlice";
import { Outlet } from "react-router-dom";
import Loader from "../ui/Loader";

const RootLayout = () => {
  const toaster = useSelector(({ toast }: AppState) => toast);
  const loader = useSelector(({ loader }: AppState) => loader.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    if (toaster.message) {
      toast(toaster.message, {
        type: toaster.type,
      });
      dispatch(clearToast());
    }
  }, [dispatch, toaster]);

  useEffect(() => {
    if (loader) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [loader]);

  return (
    <>
      <Outlet />
      {loader && <Loader />}
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
