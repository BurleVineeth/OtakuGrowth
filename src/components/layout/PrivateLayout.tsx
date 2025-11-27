import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { BackendRoutes, LocalStorageKeys, UIRoutes } from "../../constants";
import Header from "../layout/Header";
import "../../assets/styles/themes.css";
import { ThemeProvider } from "../../context/ThemeContext";
import { useEffect } from "react";
import { apiService } from "../../services/api.service";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/features/UserSlice";
import { dismissLoading, showLoading } from "../../redux/features/LoaderSlice";

const PrivateLayout = () => {
  const accessToken = localStorage.getItem(LocalStorageKeys.ACCESS_TOKEN);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (accessToken) {
      dispatch(showLoading());
      apiService
        .get(BackendRoutes.USER)
        .then(({ data: res }) => {
          dispatch(setUser(res.data.user));
        })
        .catch(() => {
          localStorage.removeItem(LocalStorageKeys.ACCESS_TOKEN);
          navigate(`/${UIRoutes.LOGIN}`);
        })
        .finally(() => {
          dispatch(dismissLoading());
        });
    }
  }, [accessToken, dispatch, navigate]);

  if (!accessToken) {
    return <Navigate to={`/${UIRoutes.LOGIN}`} replace />;
  }

  return (
    <ThemeProvider>
      <Header />
      <Outlet />
    </ThemeProvider>
  );
};

export default PrivateLayout;
