import { z } from "zod";

const registerValidationSchema = z.object({
    body: z.object({
        firstName: z
            .string()
            .trim()
            .min(2, 'First name is required and must contain at least 2 characters')
            .max(50, 'First name cannot exceed 50 characters')
            .regex(
                /^[a-zA-Z\-'\s]+$/,
                'First name can only contain letters, spaces, hyphens, or apostrophes',
            ),
        lastName: z
            .string()
            .trim()
            .min(2, 'Last name is required and must contain at least 2 characters')
            .max(50, 'Last name cannot exceed 50 characters')
            .regex(
                /^[a-zA-Z\-'\s]+$/,
                'Last name can only contain letters, spaces, hyphens, or apostrophes',
            ),
        email: z.string().email().trim(),
        password: z.string().trim(),
    })
})

export const AuthValidationSchema = {
    registerValidationSchema,
}