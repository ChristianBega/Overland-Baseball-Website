import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { useRoleCheck } from "../../../hooks/useRoleCheck";
import { ROLES } from "../../auth/utils/roles";

/**
 * Redirects authenticated users away from auth pages (sign-in, sign-up).
 * Complements RoleGuard which protects authenticated routes.
 *
 * Redirect logic:
 * - If user came from a RoleGuard redirect (location.state.from), send them back
 * - ADMIN/COACH → /dashboard
 * - PLAYER/PARENT → /documents
 * - Fallback → / (home)
 */
const AuthRedirect = ({ children }) => {
  const { isAuthenticated, userRole } = useRoleCheck();
  const location = useLocation();

  // Not authenticated - allow access to auth pages
  if (!isAuthenticated) {
    return children;
  }

  // Authenticated - redirect based on role
  const redirectTo = getRedirectPath(userRole, location);
  return <Navigate to={redirectTo} replace />;
};

/**
 * Determines where to redirect authenticated users based on role and origin.
 */
function getRedirectPath(role, location) {
  // If they came from a protected route (RoleGuard redirect), send them back
  if (location.state?.from) {
    return location.state.from.pathname;
  }

  // Role-based default redirects
  if (role === ROLES.ADMIN || role === ROLES.COACH) {
    return "/dashboard";
  }

  if (role === ROLES.PLAYER || role === ROLES.PARENT) {
    return "/documents";
  }

  // Default fallback
  return "/";
}

AuthRedirect.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthRedirect;
