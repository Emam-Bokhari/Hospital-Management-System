import { z } from 'zod';

export const createStaffRoleValidationSchema = z.object({
  body: z.object({
    name: z
      .string()
      .trim()
      .min(
        3,
        'Staff role name is required and must contain at least 03 characters',
      )
      .max(50, 'Staff role name can not exceed 50 characters'),
    createdBy: z.string().optional(),
    isDeleted: z.boolean().default(false),
  }),
});

export const StaffRoleValidationSchema = {
  createStaffRoleValidationSchema,
};
