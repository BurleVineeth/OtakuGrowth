import { Navigate, Outlet } from "react-router-dom";
import { LocalStorageKeys, UIRoutes } from "../../constants";

const PublicLayout = () => {
  const accessToken = localStorage.getItem(LocalStorageKeys.ACCESS_TOKEN);
  if (accessToken) {
    return <Navigate to={`/${UIRoutes.HOME}`} replace />;
  } else {
    return <Outlet />;
  }
};

export default PublicLayout;
