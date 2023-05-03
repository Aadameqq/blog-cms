import { Request } from 'express';
import { AuthorizeIf } from './AuthorizeIf';

const enum Permission {
  HAS_ID = 'string',
}

const enum Role {
  MOD = 'mod',
}

type RolesType = { [key in Role]: Permission[] };

const roles: RolesType = {
  mod: [Permission.HAS_ID],
};

const hasAccountPermission = (
  accRoles: Role[],
  verifiedPermission: Permission,
) =>
  accRoles.some((currentRole) =>
    roles[currentRole].includes(verifiedPermission),
  );

export const authorizeIfHasPermission =
  (permission: Permission): AuthorizeIf =>
  async (req: Request) => {
    const accountRoles = req.account.roles;
    return hasAccountPermission(accountRoles, permission);
  };
