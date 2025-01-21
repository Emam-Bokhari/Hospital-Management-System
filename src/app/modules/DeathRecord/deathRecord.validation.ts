import { z } from "zod";

const createGuardianValidationSchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, 'Name is required and must contain at least 2 characters')
        .max(50, 'Name cannot exceed 50 characters'),
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
        .string()
        .optional(),
})

const updateGuardianValidationSchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, 'Name is required and must contain at least 2 characters')
        .max(50, 'Name cannot exceed 50 characters')
        .optional(),
    relationship: z
        .string()
        .trim()
        .min(3, 'Relationship is required and must contain at least 3 characters')
        .max(50, 'Relationship cannot exceed 50 characters')
        .optional(),
    phone: z
        .string()
        .trim()
        .regex(/^\+\d{1,4}\d{7,15}$/, { message: 'Invalid phone number format!' })
        .optional(),
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
        .string()
        .optional(),
})

const createAddressValidationSchema = z.object({
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
    village: z
        .string()
        .min(
            2,
            'Village name is required and must be contain at least 2 characters',
        )
        .max(50, 'Village name cannot exceed 50 characters')
        .optional(),
    postalCode: z.string().regex(/^\d{4}$/, {
        message: "Postal code must be exactly 4 digits",
    }).optional(),
})

const updateAddressValidationSchema = z.object({
    division: z
        .string()
        .min(
            2,
            'Division name is required and must be contain at least 2 characters',
        )
        .max(50, 'Division name cannot exceed 50 characters')
        .optional(),
    district: z
        .string()
        .min(
            2,
            'District name is required and must be contain at least 2 characters',
        )
        .max(50, 'District name cannot exceed 50 characters')
        .optional(),
    subDistrict: z
        .string()
        .min(
            2,
            'Sub district name is required and must be contain at least 2 characters',
        )
        .max(50, 'Sub district name cannot exceed 50 characters')
        .optional(),
    village: z
        .string()
        .min(
            2,
            'Village name is required and must be contain at least 2 characters',
        )
        .max(50, 'Village name cannot exceed 50 characters')
        .optional(),
    postalCode: z.string()
        .regex(/^\d{4}$/, {
            message: "Postal code must be exactly 4 digits",
        })
        .optional(),
})

const createDeathRecordValidationSchema = z.object({
    body: z.object({
        guardian: createGuardianValidationSchema,
        gender: z.enum(["male", "female"]),
        age: z
            .number()
            .int()
            .min(1, 'Age is required and must be contain at least 1')
            .max(120, 'Age cannot exceed 120'),
        deathDate: z
            .string()
            .length(10)
            .regex(
                /^\d{4}-\d{2}-\d{2}$/,
                'Death date must be in YYYY-MM-DD format',
            ),
        deathTime: z.string()
            .optional(),
        placeOfDeath: z.string()
            .trim()
            .min(2, 'Place of death is required and must contain at least 2 characters')
            .max(100, 'Place of death cannot exceed 100 characters'),
        causeOfDeath: z.string()
            .trim()
            .min(2, 'Cause of death is required and must contain at least 2 characters')
            .max(200, 'Cause of death cannot exceed 200 characters'),
        deathCertificateNo: z.string()
            .optional(),
        address: createAddressValidationSchema,
        nationality: z
            .string()
            .trim()
            .min(2, 'Nationality is required and must contain at least 2 characters')
            .max(50, 'Nationality can not exceed 50 characters'),
        religion: z
            .string()
            .trim()
            .min(3, 'Religion is required and must contain at least 3 characters')
            .max(50, 'Religion can not exceed 50 characters'),
        doctor: z.string(),
        createdBy: z.string().optional(),
        isDeleted: z.boolean().default(false),
    })
})

const updateDeathRecordValidationSchema = z.object({
    body: z.object({
        guardian: updateGuardianValidationSchema.optional(),
        gender: z.enum(["male", "female"])
            .optional(),
        age: z
            .number()
            .int()
            .min(1, 'Age is required and must be contain at least 1')
            .max(120, 'Age cannot exceed 120')
            .optional(),
        deathDate: z
            .string()
            .length(10)
            .regex(
                /^\d{4}-\d{2}-\d{2}$/,
                'Death date must be in YYYY-MM-DD format',
            )
            .optional(),
        deathTime: z.string()
            .optional(),
        placeOfDeath: z.string()
            .trim()
            .min(2, 'Place of death is required and must contain at least 2 characters')
            .max(100, 'Place of death cannot exceed 100 characters')
            .optional(),
        causeOfDeath: z.string()
            .trim()
            .min(2, 'Cause of death is required and must contain at least 2 characters')
            .max(200, 'Cause of death cannot exceed 200 characters')
            .optional(),
        deathCertificateNo: z.string()
            .optional(),
        address: updateAddressValidationSchema.optional(),
        nationality: z
            .string()
            .trim()
            .min(2, 'Nationality is required and must contain at least 2 characters')
            .max(50, 'Nationality can not exceed 50 characters')
            .optional(),
        religion: z
            .string()
            .trim()
            .min(3, 'Religion is required and must contain at least 3 characters')
            .max(50, 'Religion can not exceed 50 characters')
            .optional(),
        doctor: z.string()
            .optional(),
        createdBy: z.string()
            .optional(),
        isDeleted: z.boolean().default(false),
    })
})

export const DeathRecordValidationSchema = {
    createDeathRecordValidationSchema,
    updateDeathRecordValidationSchema,
}