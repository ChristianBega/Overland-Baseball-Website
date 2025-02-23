import { Navigate, useLocation } from "react-router-dom";
import { useRoleCheck } from "../../hooks/useRoleCheck";

export const RoleGuard = ({ children, allowedRoles }) => {
  const { checkMultipleRoles, isAuthenticated } = useRoleCheck();
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/authentication/sign-in" state={{ from: location }} replace />;
  }

  // Check if user has any of the allowed roles
  const hasPermission = checkMultipleRoles(allowedRoles);
  if (hasPermission) {
    return <Navigate to={"/404"} replace />;
  }

  return children;
};
