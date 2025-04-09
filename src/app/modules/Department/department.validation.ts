import { z } from 'zod';

const createSymptomsAddressedValidationSchema = z.object({
  symptom: z
    .string()
    .trim()
    .min(3, 'Symptom is required and must contain at least 03 characters')
    .max(500, 'Symptom can not exceed 500 characters'),
  description: z
    .string()
    .trim()
    .min(20, 'Description is required and must contain at least 20 characters')
    .max(1000, 'Description can not exceed 1000 characters'),
});

const updateSymptomsAddressedValidationSchema = z.object({
  symptom: z
    .string()
    .trim()
    .min(3, 'Symptom is required and must contain at least 03 characters')
    .max(500, 'Symptom can not exceed 500 characters')
    .optional(),
  description: z
    .string()
    .trim()
    .min(20, 'Description is required and must contain at least 20 characters')
    .max(1000, 'Description can not exceed 1000 characters')
    .optional(),
});

const createPossibleCausesValidationSchema = z.object({
  cause: z
    .string()
    .trim()
    .min(3, 'Cause is required and must contain at least 03 characters')
    .max(500, 'Cause can not exceed 500 characters'),
  description: z
    .string()
    .trim()
    .min(20, 'Description is required and must contain at least 20 characters')
    .max(1000, 'Description can not exceed 1000 characters'),
});

const updatePossibleCausesValidationSchema = z.object({
  cause: z
    .string()
    .trim()
    .min(3, 'Cause is required and must contain at least 03 characters')
    .max(500, 'Cause can not exceed 500 characters')
    .optional(),
  description: z
    .string()
    .trim()
    .min(20, 'Description is required and must contain at least 20 characters')
    .max(1000, 'Description can not exceed 1000 characters')
    .optional(),
});

const createDepartmentValidationSchema = z.object({
  body: z.object({
    specialization: z.string(),
    departmentName: z.string().optional(),
    overview: z
      .string()
      .trim()
      .min(10, 'Overview is required and must contain at least 10 characters')
      .max(500, 'Overview can not exceed 500 characters'),
    description: z
      .string()
      .trim()
      .min(
        20,
        'Description is required and must contain at least 20 characters',
      )
      .max(1000, 'Description can not exceed 1000 characters'),
    symptomsAddressed: z.array(createSymptomsAddressedValidationSchema),
    possibleCauses: z.array(createPossibleCausesValidationSchema),
    status: z.enum(['active', 'inActive']).default('active'),
    createdBy: z.string().optional(),
    isDeleted: z.boolean().default(false),
  }),
});

const updateDepartmentValidationSchema = z.object({
  body: z.object({
    specialization: z.string().optional(),
    departmentName: z.string().optional(),
    overview: z
      .string()
      .trim()
      .min(10, 'Overview is required and must contain at least 10 characters')
      .max(500, 'Overview can not exceed 500 characters')
      .optional(),
    description: z
      .string()
      .trim()
      .min(
        20,
        'Description is required and must contain at least 20 characters',
      )
      .max(1000, 'Description can not exceed 1000 characters')
      .optional(),
    symptomsAddressed: z
      .array(updateSymptomsAddressedValidationSchema)
      .optional(),
    possibleCauses: z.array(updatePossibleCausesValidationSchema).optional(),
    status: z.enum(['active', 'inActive']).default('active'),
    createdBy: z.string().optional(),
    isDeleted: z.boolean().default(false),
  }),
});

export const DepartmentValidationSchema = {
  createDepartmentValidationSchema,
  updateDepartmentValidationSchema,
};
