import { z } from 'zod';

const addressValidationSchema = z.object({
  division: z
    .string()
    .min(
      2,
      'Division name is required and must be contain at least 2 characters',
    )
    .max(50, 'Division name cannot exceed 50 characters'),
  district: z
    .string()
    .min(
      2,
      'District name is required and must be contain at least 2 characters',
    )
    .max(50, 'District name cannot exceed 50 characters'),
  subDistrict: z
    .string()
    .min(
      2,
      'Sub district name is required and must be contain at least 2 characters',
    )
    .max(50, 'Sub district name cannot exceed 50 characters'),
});

const contactInformationValidationSchema = z.object({
  phone: z
    .string()
    .trim()
    .regex(/^\+\d{1,4}\d{7,15}$/, { message: 'Invalid phone number format!' }),
  email: z
    .string()
    .email('Invalid email format')
    .max(100, 'Email cannot exceed 100 characters')
    .optional(),
});

const createTestBookingValidationSchema = z.object({
  body: z.object({
    userId: z.string().optional(),
    id: z.string().optional(),
    test: z.string(),
    payment: z.string().optional(),
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
    age: z
      .number()
      .int()
      .min(1, 'Age is required and must be contain at least 1')
      .max(120, 'Age cannot exceed 120'),
    weight: z
      .number()
      .int('Weight must be an integer')
      .min(3, 'Weight must be at least 3 kg')
      .max(300, 'Weight cannot exceed 300 kg')
      .optional(),
    gender: z.enum(['male', 'female']),
    contactInformation: contactInformationValidationSchema,
    address: addressValidationSchema,
    medicalHistory: z.array(z.string()).optional(),
    symptoms: z.array(z.string()).optional(),
    status: z
      .enum(['pending', 'confirmed', 'completed', 'cancelled'])
      .default('pending'),
  }),
});

export const TestBookingValidationSchema = {
  createTestBookingValidationSchema,
};
