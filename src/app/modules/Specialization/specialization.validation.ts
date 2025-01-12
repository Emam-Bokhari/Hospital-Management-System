import { z } from "zod";

export const SpecializationValidationSchema = z.object({
    body: z.object({
        name: z.string()
            .trim()
            .min(3, "Specialization name is required and must contain at least 3 characters")
            .max(100, "Specialization name cannot exceed 100 characters")
            .regex(
                /^[a-zA-Z\-'\s]+$/,
                'Name can only contain letters, spaces, hyphens, or apostrophes',
            ),
        createdBy: z.string().optional(),
        isDeleted: z.boolean().default(false)
    })

})



