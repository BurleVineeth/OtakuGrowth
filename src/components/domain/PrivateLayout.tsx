import { Navigate, Outlet } from "react-router-dom";
import { LocalStorageKeys, UIRoutes } from "../../constants";

const PrivateLayout = () => {
  const accessToken = localStorage.getItem(LocalStorageKeys.ACCESS_TOKEN);
  if (!accessToken) {
    return <Navigate to={`/${UIRoutes.LOGIN}`} replace />;
  } else {
    return (
      <>
        <Outlet />
      </>
    );
  }
};

export default PrivateLayout;
