// ! FIREBASE is deprecating.... might remove soon....
import { ROLES, ROLE_HIERARCHY } from "../features/auth/utils/roles";

import { useContext } from "react";
import { UserContext } from "../features/auth/context/UserContext";

/**
 * Check the signed-in user's Firebase role against ROLE_HIERARCHY.
 * Firebase roles are being phased out: don't add new callers (docs/conventions.md#deprecated-code).
 *
 * @returns {{hasRole: function(string): boolean, checkMultipleRoles: function(string[]): boolean,
 *   isAdmin: boolean, isCoach: boolean, isPlayer: boolean, isParent: boolean,
 *   isAuthenticated: boolean, userRole: (string|undefined)}}
 */
export const useRoleCheck = () => {
  const { currentUserProfile } = useContext(UserContext);
  const hasRole = (requiredRole) => {
    if (!currentUserProfile?.role) {
      return false;
    }
    const hasPermission = ROLE_HIERARCHY[currentUserProfile.role]?.includes(requiredRole) || false;
    return hasPermission;
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
