import { Navigate, Outlet } from "react-router-dom";
import { LocalStorageKeys, UIRoutes } from "../../constants";
import Header from "../layout/Header";
import "../../assets/styles/themes.css";
import { ThemeProvider } from "../../context/ThemeContext";

const PrivateLayout = () => {
  const accessToken = localStorage.getItem(LocalStorageKeys.ACCESS_TOKEN);
  if (!accessToken) {
    return <Navigate to={`/${UIRoutes.LOGIN}`} replace />;
  } else {
    return (
      <ThemeProvider>
        <Header />
        <Outlet />
      </ThemeProvider>
    );
  }
};

export default PrivateLayout;
