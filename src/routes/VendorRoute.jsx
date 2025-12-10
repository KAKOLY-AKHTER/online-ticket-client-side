import { Navigate } from "react-router";
import LoadingSpinner from "../components/Shared/LoadingSpinner";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/UseRole";


const VendorRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, isRoleLoading } = useRole();

  if (loading || isRoleLoading) return <LoadingSpinner />;

  if (user && role === "vendor") return children;

  return <Navigate to="/" />;
};

export default VendorRoute;
