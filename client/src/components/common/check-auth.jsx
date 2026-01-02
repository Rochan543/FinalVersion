import { Navigate, useLocation } from "react-router-dom";

function CheckAuth({ isAuthenticated, user, isLoading, children }) {
  const location = useLocation();

  // ⛔ VERY IMPORTANT:
  // Do NOTHING while auth state is being restored
  if (isLoading) {
    return <>{children}</>;
  }

  const isAuthPage =
    location.pathname.includes("/login") ||
    location.pathname.includes("/register");

  // 🔒 Not authenticated → block protected routes
  if (!isAuthenticated && !isAuthPage) {
    return <Navigate to="/auth/login" replace />;
  }

  // 🔁 Authenticated → prevent access to auth pages
  if (isAuthenticated && isAuthPage) {
    if (user?.role === "admin") {
      return <Navigate to="/admin/dashboard" replace />;
    }
    return <Navigate to="/shop/home" replace />;
  }

  // 🚫 User trying to access admin routes
  if (
    isAuthenticated &&
    user?.role !== "admin" &&
    location.pathname.includes("/admin")
  ) {
    return <Navigate to="/unauth-page" replace />;
  }

  // 🚫 Admin trying to access shop routes
  if (
    isAuthenticated &&
    user?.role === "admin" &&
    location.pathname.includes("/shop")
  ) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <>{children}</>;
}

export default CheckAuth;
