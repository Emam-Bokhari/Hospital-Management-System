import { z } from "zod";

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

const createGuardianValidationSchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, 'Name is required and must contain at least 2 characters')
        .max(100, 'Name cannot exceed 100 characters'),
    relationship: z
        .string()
        .trim()
        .min(3, 'Relationship is required and must contain at least 3 characters')
        .max(50, 'Relationship cannot exceed 50 characters'),
    phone: z
        .string()
        .trim()
        .regex(/^\+\d{1,4}\d{7,15}$/, { message: 'Invalid phone number format!' }),
    email: z
        .string()
        .trim()
        .email('Invalid email format')
        .max(100, 'Email cannot exceed 100 characters')
        .optional(),
    nidNumber: z
        .string()
        .trim()
        .regex(/^\d{10}$/, {
            message: 'NID number must be exactly 10 digits.',
        }).optional(),
    nidScannedCopy: z
        .string().optional(),
});

const createAdmissionBookingValidationSchema = z.object({
    body: z.object({
        id: z.string().optional(),
        userId: z.string().optional(),
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
            .min(3, 'Weight must be at least 5 kg')
            .max(300, 'Weight cannot exceed 300 kg')
            .optional(),
        bloodGroup: z
            .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
            .optional(),
        gender: z.enum(["male", "female"]),
        contactInformation: contactInformationValidationSchema,
        guardian: createGuardianValidationSchema,
        address: addressValidationSchema,
        bed: z.string(),
        admissionDate: z.string(),
        dischargeDate: z.string(),
        reasonForAdmission: z
            .string()
            .max(500, 'Additional notes cannot exceed 500 characters'),
        medicalHistory: z.array(z.string()).optional(),
        status: z
            .enum(['pending', 'admitted', 'discharged', 'cancelled'])
            .default('pending'),
    }),
})

export const AdmissionBookingValidationSchema = {
    createAdmissionBookingValidationSchema,
}