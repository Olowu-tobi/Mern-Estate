import About from "../pages/About";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import SignUp from "../pages/SignUp";

const routes = [
  {
    path: "/",
    element: Home,
    isPrivate: true,
  },
  {
    path: "/about",
    element: About,
    isPrivate: true,
  },
  {
    path: "/profile",
    element: Profile,
    isPrivate: true,
  },
  {
    path: "/sign-up",
    element: SignUp,
    isPrivate: false,
  },
  {
    path: "/login",
    element: Login,
    isPrivate: false,
  },
];

export default routes;
