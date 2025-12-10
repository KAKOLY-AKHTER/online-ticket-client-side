// import { Navigate } from "react-router-dom";
// import useAuth from "../hooks/useAuth";
// import useRole from "../hooks/useRole";
// import LoadingSpinner from "../components/Shared/LoadingSpinner";

import { Navigate } from "react-router";
import LoadingSpinner from "../components/Shared/LoadingSpinner";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/UseRole";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, isRoleLoading } = useRole();

  if (loading || isRoleLoading) return <LoadingSpinner />;

  if (user && role === "admin") return children;

  return <Navigate to="/" />;
};

export default AdminRoute;
