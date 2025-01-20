"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentBookingValidationSchema = exports.createAppointmentBookingValidationSchema = void 0;
const zod_1 = require("zod");
const addressValidationSchema = zod_1.z.object({
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
exports.createAppointmentBookingValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.string().optional(),
        id: zod_1.z.string().optional(),
        firstName: zod_1.z
            .string()
            .trim()
            .min(2, 'First name is required and must contain at least 2 characters')
            .max(50, 'First name cannot exceed 50 characters')
            .regex(/^[a-zA-Z\-'\s]+$/, 'First name can only contain letters, spaces, hyphens, or apostrophes'),
        lastName: zod_1.z
            .string()
            .trim()
            .min(2, 'Last name is required and must contain at least 2 characters')
            .max(50, 'Last name cannot exceed 50 characters')
            .regex(/^[a-zA-Z\-'\s]+$/, 'Last name can only contain letters, spaces, hyphens, or apostrophes'),
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
        address: addressValidationSchema,
        contactInformation: contactInformationValidationSchema,
        doctor: zod_1.z.string(),
        appointmentDate: zod_1.z.string(),
        timeSlot: zod_1.z
            .string()
            .regex(/^(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])$/, 'Time slot must be in HH:mm 24-hour format'),
        status: zod_1.z
            .enum(['pending', 'confirmed', 'completed', 'cancelled'])
            .default('pending')
            .optional(),
        prescriptionFiles: zod_1.z.array(zod_1.z.string()).optional(),
        testReportFiles: zod_1.z.array(zod_1.z.string()).optional(),
        additionalNotes: zod_1.z
            .string()
            .max(500, 'Additional notes cannot exceed 500 characters')
            .optional(),
        payment: zod_1.z.string().optional(),
    }),
});
exports.AppointmentBookingValidationSchema = {
    createAppointmentBookingValidationSchema: exports.createAppointmentBookingValidationSchema,
};
