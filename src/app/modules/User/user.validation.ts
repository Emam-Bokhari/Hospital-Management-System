import { z } from 'zod';

const createUserValidationSchema = z.object({
  body: z.object({
    firstName: z
      .string()
      .trim()
      .min(1, 'First name is required')
      .max(50, 'First name cannot exceed 50 characters')
      .regex(
        /^[a-zA-Z\-'\s]+$/,
        'First name can only contain letters, spaces, hyphens, or apostrophes',
      ),
    lastName: z
      .string()
      .trim()
      .min(1, 'Last name is required')
      .max(50, 'Last name cannot exceed 50 characters')
      .regex(
        /^[a-zA-Z\-'\s]+$/,
        'Last name can only contain letters, spaces, hyphens, or apostrophes',
      ),
    email: z
      .string()
      .email('Invalid email format')
      .max(100, 'Email cannot exceed 100 characters'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters long')
      .max(64, 'Password cannot exceed 64 characters')
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]+$/,
        'Password must contain at least one letter and one number',
      ),
    role: z
      .enum([
        'user',
        'doctor',
        'receptionist',
        'finance-manager',
        'admin',
        'super-admin',
      ])
      .default('user'),
    status: z.enum(['active', 'suspend']).default('active'),
    isDeleted: z.boolean().default(false),
  }),
});

const updateUserValidationSchema = z.object({
  body: z.object({
    firstName: z
      .string()
      .trim()
      .min(1, 'First name is required')
      .max(50, 'First name cannot exceed 50 characters')
      .regex(
        /^[a-zA-Z\-'\s]+$/,
        'First name can only contain letters, spaces, hyphens, or apostrophes',
      )
      .optional(),
    lastName: z
      .string()
      .trim()
      .min(1, 'First name is required')
      .max(50, 'First name cannot exceed 50 characters')
      .regex(
        /^[a-zA-Z\-'\s]+$/,
        'Last name can only contain letters, spaces, hyphens, or apostrophes',
      )
      .optional(),
    email: z
      .string()
      .email('Invalid email format')
      .max(100, 'Email cannot exceed 100 characters')
      .optional(),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters long')
      .max(64, 'Password cannot exceed 64 characters')
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]+$/,
        'Password must contain at least one letter and one number',
      )
      .optional(),
    role: z
      .enum([
        'user',
        'doctor',
        'receptionist',
        'finance-manager',
        'admin',
        'super-admin',
      ])
      .default('user'),
    status: z.enum(['active', 'suspend']).default('active'),
    isDeleted: z.boolean().default(false),
  }),
});

export const UserValidationSchema = {
  createUserValidationSchema,
  updateUserValidationSchema,
};
