"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeathRecordValidationSchema = void 0;
const zod_1 = require("zod");
const createGuardianValidationSchema = zod_1.z.object({
    name: zod_1.z
        .string()
        .trim()
        .min(2, 'Name is required and must contain at least 2 characters')
        .max(50, 'Name cannot exceed 50 characters'),
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
const updateGuardianValidationSchema = zod_1.z.object({
    name: zod_1.z
        .string()
        .trim()
        .min(2, 'Name is required and must contain at least 2 characters')
        .max(50, 'Name cannot exceed 50 characters')
        .optional(),
    relationship: zod_1.z
        .string()
        .trim()
        .min(3, 'Relationship is required and must contain at least 3 characters')
        .max(50, 'Relationship cannot exceed 50 characters')
        .optional(),
    phone: zod_1.z
        .string()
        .trim()
        .regex(/^\+\d{1,4}\d{7,15}$/, { message: 'Invalid phone number format!' })
        .optional(),
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
const createAddressValidationSchema = zod_1.z.object({
    division: zod_1.z
        .string()
        .min(2, 'Division name is required and must be contain at least 2 characters')
        .max(50, 'Division name cannot exceed 50 characters'),
    district: zod_1.z
        .string()
        .min(2, 'District name is required and must be contain at least 2 characters')
        .max(50, 'District name cannot exceed 50 characters'),
    subDistrict: zod_1.z
        .string()
        .min(2, 'Sub district name is required and must be contain at least 2 characters')
        .max(50, 'Sub district name cannot exceed 50 characters'),
    village: zod_1.z
        .string()
        .min(2, 'Village name is required and must be contain at least 2 characters')
        .max(50, 'Village name cannot exceed 50 characters')
        .optional(),
    postalCode: zod_1.z
        .string()
        .regex(/^\d{4}$/, {
        message: 'Postal code must be exactly 4 digits',
    })
        .optional(),
});
const updateAddressValidationSchema = zod_1.z.object({
    division: zod_1.z
        .string()
        .min(2, 'Division name is required and must be contain at least 2 characters')
        .max(50, 'Division name cannot exceed 50 characters')
        .optional(),
    district: zod_1.z
        .string()
        .min(2, 'District name is required and must be contain at least 2 characters')
        .max(50, 'District name cannot exceed 50 characters')
        .optional(),
    subDistrict: zod_1.z
        .string()
        .min(2, 'Sub district name is required and must be contain at least 2 characters')
        .max(50, 'Sub district name cannot exceed 50 characters')
        .optional(),
    village: zod_1.z
        .string()
        .min(2, 'Village name is required and must be contain at least 2 characters')
        .max(50, 'Village name cannot exceed 50 characters')
        .optional(),
    postalCode: zod_1.z
        .string()
        .regex(/^\d{4}$/, {
        message: 'Postal code must be exactly 4 digits',
    })
        .optional(),
});
const createDeathRecordValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        guardian: createGuardianValidationSchema,
        gender: zod_1.z.enum(['male', 'female']),
        age: zod_1.z
            .number()
            .int()
            .min(1, 'Age is required and must be contain at least 1')
            .max(120, 'Age cannot exceed 120'),
        deathDate: zod_1.z
            .string()
            .length(10)
            .regex(/^\d{4}-\d{2}-\d{2}$/, 'Death date must be in YYYY-MM-DD format'),
        deathTime: zod_1.z.string().optional(),
        placeOfDeath: zod_1.z
            .string()
            .trim()
            .min(2, 'Place of death is required and must contain at least 2 characters')
            .max(100, 'Place of death cannot exceed 100 characters'),
        causeOfDeath: zod_1.z
            .string()
            .trim()
            .min(2, 'Cause of death is required and must contain at least 2 characters')
            .max(200, 'Cause of death cannot exceed 200 characters'),
        deathCertificateNo: zod_1.z.string().optional(),
        address: createAddressValidationSchema,
        nationality: zod_1.z
            .string()
            .trim()
            .min(2, 'Nationality is required and must contain at least 2 characters')
            .max(50, 'Nationality can not exceed 50 characters'),
        religion: zod_1.z
            .string()
            .trim()
            .min(3, 'Religion is required and must contain at least 3 characters')
            .max(50, 'Religion can not exceed 50 characters'),
        doctor: zod_1.z.string(),
        createdBy: zod_1.z.string().optional(),
        isDeleted: zod_1.z.boolean().default(false),
    }),
});
const updateDeathRecordValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        guardian: updateGuardianValidationSchema.optional(),
        gender: zod_1.z.enum(['male', 'female']).optional(),
        age: zod_1.z
            .number()
            .int()
            .min(1, 'Age is required and must be contain at least 1')
            .max(120, 'Age cannot exceed 120')
            .optional(),
        deathDate: zod_1.z
            .string()
            .length(10)
            .regex(/^\d{4}-\d{2}-\d{2}$/, 'Death date must be in YYYY-MM-DD format')
            .optional(),
        deathTime: zod_1.z.string().optional(),
        placeOfDeath: zod_1.z
            .string()
            .trim()
            .min(2, 'Place of death is required and must contain at least 2 characters')
            .max(100, 'Place of death cannot exceed 100 characters')
            .optional(),
        causeOfDeath: zod_1.z
            .string()
            .trim()
            .min(2, 'Cause of death is required and must contain at least 2 characters')
            .max(200, 'Cause of death cannot exceed 200 characters')
            .optional(),
        deathCertificateNo: zod_1.z.string().optional(),
        address: updateAddressValidationSchema.optional(),
        nationality: zod_1.z
            .string()
            .trim()
            .min(2, 'Nationality is required and must contain at least 2 characters')
            .max(50, 'Nationality can not exceed 50 characters')
            .optional(),
        religion: zod_1.z
            .string()
            .trim()
            .min(3, 'Religion is required and must contain at least 3 characters')
            .max(50, 'Religion can not exceed 50 characters')
            .optional(),
        doctor: zod_1.z.string().optional(),
        createdBy: zod_1.z.string().optional(),
        isDeleted: zod_1.z.boolean().default(false),
    }),
});
exports.DeathRecordValidationSchema = {
    createDeathRecordValidationSchema,
    updateDeathRecordValidationSchema,
};
