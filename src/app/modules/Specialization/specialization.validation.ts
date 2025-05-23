import { z } from 'zod';

export const createSpecializationValidationSchema = z.object({
  body: z.object({
    name: z
      .string()
      .trim()
      .min(
        3,
        'Specialization name is required and must contain at least 3 characters',
      )
      .max(100, 'Specialization name cannot exceed 100 characters'),
    createdBy: z.string().optional(),
    isDeleted: z.boolean().default(false),
  }),
});

export const SpecializationValidationSchema = {
  createSpecializationValidationSchema,
};
