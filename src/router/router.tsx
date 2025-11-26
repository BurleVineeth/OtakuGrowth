import {
  createBrowserRouter,
} from "react-router";
import { UIRoutes } from "../constants";
import NotFound from "../components/NotFound";
import { Login, Register } from "../components/authentication";
import { Home } from "../components/domain";

const router = createBrowserRouter([
  {
    path: UIRoutes.ROOT,
    element: <Login />,
  },
  {
    path: UIRoutes.LOGIN,
    element: <Login />,
  },
  {
    path: UIRoutes.REGISTER,
    element: <Register />,
  },
  {
    path: UIRoutes.HOME,
    element: <Home />,
  },
  {
    path: '*',
    element: <NotFound />
  }
]);

export default router;