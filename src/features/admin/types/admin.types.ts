import { z } from 'zod';

export const createRoleSchema = z.object({
  slug: z
    .string()
    .trim()
    .toLowerCase()
    .regex(/^[a-z0-9_-]{2,32}$/, 'Use apenas letras minúsculas, números, - ou _ (2 a 32 chars)'),
  name: z.string().trim().min(2, 'Nome obrigatório').max(60),
  description: z.string().trim().max(200).optional().default(''),
});

export type CreateRoleInput = z.infer<typeof createRoleSchema>;

export interface RoleRecord {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  is_system: boolean;
}

export interface PermissionRecord {
  id: string;
  key: string;
  module: string;
  description: string;
}

export interface RolePermissionLink {
  role_id: string;
  permission_id: string;
}

export interface ProfileSummary {
  id: string;
  full_name: string | null;
  is_active: boolean;
  roleIds: string[];
}
