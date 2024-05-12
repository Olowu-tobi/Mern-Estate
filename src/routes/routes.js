import About from "../pages/About";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import SignUp from "../pages/SignUp";

const routes = [
  {
    path: "/",
    element: Home,
  },
  {
    path: "/about",
    element: About,
  },
  {
    path: "/profile",
    element: Profile,
  },
  {
    path: "/sign-up",
    element: SignUp,
  },
  {
    path: "/login",
    element: Login,
  },
];

export default routes;
