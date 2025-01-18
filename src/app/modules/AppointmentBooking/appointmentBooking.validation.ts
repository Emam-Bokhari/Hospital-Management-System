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
    .regex(/^\+\d{1,4}\d{7,15}$/, { message: 'Invalid phone number format!' })
    .optional(),
  email: z
    .string()
    .email('Invalid email format')
    .max(100, 'Email cannot exceed 100 characters')
    .optional(),
});

export const createAppointmentBookingValidationSchema = z.object({
  body: z.object({
    userId: z.string(),
    id: z.string().optional(),
    firstName: z
      .string()
      .trim()
      .min(2, 'First name is required and must contain at least 2 characters')
      .max(50, 'First name cannot exceed 50 characters')
      .regex(
        /^[a-zA-Z\-'\s]+$/,
        'First name can only contain letters, spaces, hyphens, or apostrophes',
      )
      .optional(),
    lastName: z
      .string()
      .trim()
      .min(2, 'Last name is required and must contain at least 2 characters')
      .max(50, 'Last name cannot exceed 50 characters')
      .regex(
        /^[a-zA-Z\-'\s]+$/,
        'Last name can only contain letters, spaces, hyphens, or apostrophes',
      )
      .optional(),
    age: z
      .number()
      .int()
      .min(1, 'Age is required and must be contain at least 1')
      .max(120, 'Age cannot exceed 120'),
    weight: z
      .number()
      .int('Weight must be an integer')
      .min(3, 'Weight must be at least 5 kg')
      .max(300, 'Weight cannot exceed 300 kg')
      .optional(),
    bloodGroup: z
      .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
      .optional(),
    gender: z.enum(['male', 'female']),
    address: addressValidationSchema,
    contactInformation: contactInformationValidationSchema,
    doctor: z.string(),
    appointmentDate: z.string(),
    timeSlot: z
      .string()
      .regex(
        /^(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])$/,
        'Time slot must be in HH:mm 24-hour format',
      ),
    status: z
      .enum(['pending', 'confirmed', 'completed', 'cancelled'])
      .optional(),
    prescriptionFiles: z.array(z.string()).optional(),
    testReportFiles: z.array(z.string()).optional(),
    additionalNotes: z
      .string()
      .max(500, 'Additional notes cannot exceed 500 characters')
      .optional(),
    payment: z.string().optional(),
  }),
});

export const AppointmentBookingValidationSchema = {
  createAppointmentBookingValidationSchema,
};
