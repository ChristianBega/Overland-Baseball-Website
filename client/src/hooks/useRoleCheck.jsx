import { useContext } from "react";
import { UserContext } from "../setup/context/user.context";
import { ROLES, ROLE_HIERARCHY } from "../setup/utils/constants/roles";

export const useRoleCheck = () => {
  const { currentUserProfile } = useContext(UserContext);

  const hasRole = (requiredRole) => {
    if (!currentUserProfile?.role) return false;
    return ROLE_HIERARCHY[currentUserProfile.role]?.includes(requiredRole) || false;
  };

  const checkMultipleRoles = (requiredRoles) => {
    return requiredRoles.some((role) => hasRole(role));
  };

  return {
    hasRole,
    checkMultipleRoles,
    isAdmin: hasRole(ROLES.ADMIN),
    isCoach: hasRole(ROLES.COACH),
    isPlayer: hasRole(ROLES.PLAYER),
    isParent: hasRole(ROLES.PARENT),
    isAuthenticated: !!currentUserProfile,
    userRole: currentUserProfile?.role,
  };
};
