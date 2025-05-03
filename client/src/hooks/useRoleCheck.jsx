import { ROLES, ROLE_HIERARCHY } from "../features/auth/utils/roles";

import { useContext } from "react";
import { UserContext } from "../setup/context/user.context";

export const useRoleCheck = () => {
  const { currentUserProfile } = useContext(UserContext);
  const hasRole = (requiredRole) => {
    if (!currentUserProfile?.role) {
      return false;
    }
    const hasPermission = ROLE_HIERARCHY[currentUserProfile.role]?.includes(requiredRole) || false;
    return !hasPermission;
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
