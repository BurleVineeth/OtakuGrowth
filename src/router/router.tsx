import { createBrowserRouter, Navigate } from "react-router";
import { UIRoutes } from "../constants";
import { Login, Register } from "../components/authentication";
import RootLayout from "../components/domain/RootLayout";
import PublicLayout from "../components/domain/PublicLayout";
import PrivateLayout from "../components/domain/PrivateLayout";
import { Home } from "../components/domain";
import NotFound from "../components/ui/NotFound";

const router = createBrowserRouter([
  {
    path: UIRoutes.ROOT,
    element: <RootLayout />,
    children: [
      {
        element: <PublicLayout />,
        children: [
          {
            path: UIRoutes.LOGIN,
            element: <Login />,
          },
          {
            path: UIRoutes.REGISTER,
            element: <Register />,
          },
        ],
      },
      {
        element: <PrivateLayout />,
        children: [
          { path: UIRoutes.HOME, element: <Home /> },
          { path: UIRoutes.ROOT, element: <Navigate to={UIRoutes.HOME} replace /> },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
