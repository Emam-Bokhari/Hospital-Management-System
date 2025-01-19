"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidationSchema = void 0;
const zod_1 = require("zod");
const createUserValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        firstName: zod_1.z
            .string()
            .trim()
            .min(1, 'First name is required')
            .max(50, 'First name cannot exceed 50 characters')
            .regex(/^[a-zA-Z\-'\s]+$/, 'First name can only contain letters, spaces, hyphens, or apostrophes'),
        lastName: zod_1.z
            .string()
            .trim()
            .min(1, 'Last name is required')
            .max(50, 'Last name cannot exceed 50 characters')
            .regex(/^[a-zA-Z\-'\s]+$/, 'Last name can only contain letters, spaces, hyphens, or apostrophes'),
        email: zod_1.z
            .string()
            .email('Invalid email format')
            .max(100, 'Email cannot exceed 100 characters'),
        password: zod_1.z
            .string()
            .min(8, 'Password must be at least 8 characters long')
            .max(64, 'Password cannot exceed 64 characters')
            .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]+$/, 'Password must contain at least one letter and one number'),
        role: zod_1.z
            .enum([
            'user',
            'doctor',
            'accounts-specialist',
            'finance-manager',
            'admin',
            'super-admin',
        ])
            .default('user'),
        status: zod_1.z.enum(['active', 'suspend']).default('active'),
        isDeleted: zod_1.z.boolean().default(false),
    }),
});
const updateUserValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        firstName: zod_1.z
            .string()
            .trim()
            .min(1, 'First name is required')
            .max(50, 'First name cannot exceed 50 characters')
            .regex(/^[a-zA-Z\-'\s]+$/, 'First name can only contain letters, spaces, hyphens, or apostrophes')
            .optional(),
        lastName: zod_1.z
            .string()
            .trim()
            .min(1, 'First name is required')
            .max(50, 'First name cannot exceed 50 characters')
            .regex(/^[a-zA-Z\-'\s]+$/, 'Last name can only contain letters, spaces, hyphens, or apostrophes')
            .optional(),
        email: zod_1.z
            .string()
            .email('Invalid email format')
            .max(100, 'Email cannot exceed 100 characters')
            .optional(),
        password: zod_1.z
            .string()
            .min(8, 'Password must be at least 8 characters long')
            .max(64, 'Password cannot exceed 64 characters')
            .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]+$/, 'Password must contain at least one letter and one number')
            .optional(),
        role: zod_1.z
            .enum([
            'user',
            'doctor',
            'accounts-specialist',
            'finance-manager',
            'admin',
            'super-admin',
        ])
            .default('user'),
        status: zod_1.z.enum(['active', 'suspend']).default('active'),
        isDeleted: zod_1.z.boolean().default(false),
    }),
});
exports.UserValidationSchema = {
    createUserValidationSchema,
    updateUserValidationSchema,
};
