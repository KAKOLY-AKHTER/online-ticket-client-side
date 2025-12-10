// import useAuth from "../hooks/useAuth";
// import useRole from "../hooks/useRole";
// import { Navigate } from "react-router-dom";

import { Navigate } from "react-router";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/UseRole";
import LoadingSpinner from "../components/Shared/LoadingSpinner";

const VendorRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [role, roleLoading] = useRole();

  if (loading || roleLoading) return <LoadingSpinner/>;

  if (user && role === "vendor") return children;

  return <Navigate to="/" />;
};

export default VendorRoute;