'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.AdmissionBookingValidationSchema = void 0;
const zod_1 = require('zod');
const addressValidationSchema = zod_1.z.object({
  division: zod_1.z
    .string()
    .min(
      2,
      'Division name is required and must be contain at least 2 characters',
    )
    .max(50, 'Division name cannot exceed 50 characters'),
  district: zod_1.z
    .string()
    .min(
      2,
      'District name is required and must be contain at least 2 characters',
    )
    .max(50, 'District name cannot exceed 50 characters'),
  subDistrict: zod_1.z
    .string()
    .min(
      2,
      'Sub district name is required and must be contain at least 2 characters',
    )
    .max(50, 'Sub district name cannot exceed 50 characters'),
});
const contactInformationValidationSchema = zod_1.z.object({
  phone: zod_1.z
    .string()
    .trim()
    .regex(/^\+\d{1,4}\d{7,15}$/, { message: 'Invalid phone number format!' }),
  email: zod_1.z
    .string()
    .email('Invalid email format')
    .max(100, 'Email cannot exceed 100 characters')
    .optional(),
});
const createGuardianValidationSchema = zod_1.z.object({
  name: zod_1.z
    .string()
    .trim()
    .min(2, 'Name is required and must contain at least 2 characters')
    .max(100, 'Name cannot exceed 100 characters'),
  relationship: zod_1.z
    .string()
    .trim()
    .min(3, 'Relationship is required and must contain at least 3 characters')
    .max(50, 'Relationship cannot exceed 50 characters'),
  phone: zod_1.z
    .string()
    .trim()
    .regex(/^\+\d{1,4}\d{7,15}$/, { message: 'Invalid phone number format!' }),
  email: zod_1.z
    .string()
    .trim()
    .email('Invalid email format')
    .max(100, 'Email cannot exceed 100 characters')
    .optional(),
  nidNumber: zod_1.z
    .string()
    .trim()
    .regex(/^\d{10}$/, {
      message: 'NID number must be exactly 10 digits.',
    })
    .optional(),
  nidScannedCopy: zod_1.z.string().optional(),
});
const createAdmissionBookingValidationSchema = zod_1.z.object({
  body: zod_1.z.object({
    id: zod_1.z.string().optional(),
    userId: zod_1.z.string().optional(),
    firstName: zod_1.z
      .string()
      .trim()
      .min(2, 'First name is required and must contain at least 2 characters')
      .max(50, 'First name cannot exceed 50 characters')
      .regex(
        /^[a-zA-Z\-'\s]+$/,
        'First name can only contain letters, spaces, hyphens, or apostrophes',
      ),
    lastName: zod_1.z
      .string()
      .trim()
      .min(2, 'Last name is required and must contain at least 2 characters')
      .max(50, 'Last name cannot exceed 50 characters')
      .regex(
        /^[a-zA-Z\-'\s]+$/,
        'Last name can only contain letters, spaces, hyphens, or apostrophes',
      ),
    age: zod_1.z
      .number()
      .int()
      .min(1, 'Age is required and must be contain at least 1')
      .max(120, 'Age cannot exceed 120'),
    weight: zod_1.z
      .number()
      .int('Weight must be an integer')
      .min(3, 'Weight must be at least 5 kg')
      .max(300, 'Weight cannot exceed 300 kg')
      .optional(),
    bloodGroup: zod_1.z
      .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
      .optional(),
    gender: zod_1.z.enum(['male', 'female']),
    contactInformation: contactInformationValidationSchema,
    guardian: createGuardianValidationSchema,
    address: addressValidationSchema,
    bed: zod_1.z.string(),
    totalCost: zod_1.z.number().optional(),
    admissionDate: zod_1.z.string().optional(),
    dischargeDate: zod_1.z.string(),
    reasonForAdmission: zod_1.z
      .string()
      .max(500, 'Additional notes cannot exceed 500 characters'),
    medicalHistory: zod_1.z.array(zod_1.z.string()).optional(),
    status: zod_1.z
      .enum(['pending', 'admitted', 'discharged', 'cancelled'])
      .default('pending'),
  }),
});
exports.AdmissionBookingValidationSchema = {
  createAdmissionBookingValidationSchema,
};
