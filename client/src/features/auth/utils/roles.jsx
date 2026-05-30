// ! FIREBASE is deprecating.... might remove soon....
export const ROLES = {
  USER: "user",
  PARENT: "parent",
  PLAYER: "player",
  COACH: "coach",
  ADMIN: "admin",
};

export const ROLE_HIERARCHY = {
  [ROLES.ADMIN]: [ROLES.ADMIN, ROLES.COACH, ROLES.PLAYER, ROLES.PARENT, ROLES.USER],
  [ROLES.COACH]: [ROLES.COACH, ROLES.PLAYER, ROLES.PARENT, ROLES.USER],
  [ROLES.PLAYER]: [ROLES.PLAYER, ROLES.USER],
  [ROLES.PARENT]: [ROLES.PARENT, ROLES.USER],
  [ROLES.USER]: [ROLES.USER],
};
