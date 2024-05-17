import { Navigate } from "react-router-dom";
import { useAuthState } from "../features/hooks/useAuth";
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";

const AuthMiddleware = ({ children, isPrivate }) => {
  const { isAuthenticated } = useAuthState();

  if (!isAuthenticated && isPrivate) {
    return <Navigate to="/login" />;
  }
  if (isAuthenticated && !isPrivate) {
    return <Navigate to="/" />;
  }
  const Layout = isPrivate ? MainLayout : AuthLayout;
  return <Layout>{children}</Layout>;
};

export default AuthMiddleware;
