"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestValidationSchema = void 0;
const zod_1 = require("zod");
const createTestValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        testName: zod_1.z
            .string()
            .trim()
            .min(3, 'Test name must be contain at least 03 characters')
            .max(100, 'Test name can not exceed 100 characters')
            .nonempty('Test name is required.'),
        testDescription: zod_1.z
            .string()
            .trim()
            .min(3, 'Test description must be contain at least 03 characters')
            .max(500, 'Test description can not exceed 500 characters')
            .nonempty('Test description is required.'),
        testCategory: zod_1.z.enum([
            'diagnostic',
            'clinical',
            'radiology',
            'pathology',
            'microbiology',
            'biochemistry',
            'hematology',
            'immunology',
            'genetics',
            'toxicology',
        ]),
        price: zod_1.z
            .number()
            .positive('Price must be a positive number.')
            .min(1, 'Price must be at least 1.')
            .max(1000000, 'Price cannot exceed 1,000,000.'),
        duration: zod_1.z
            .string()
            .regex(/^\d{1,3} (minutes?|hours?)$/, "Duration must be in the format 'X minutes' or 'X hours'.")
            .nonempty('Duration is required.'),
        testPreparation: zod_1.z
            .string()
            .max(500, 'Test preparation instructions cannot exceed 500 characters.')
            .nonempty('Test preparation is required.'),
        testMethodology: zod_1.z
            .string()
            .max(1000, 'Test methodology cannot exceed 1000 characters.')
            .nonempty('Test methodology is required.'),
        roomNumber: zod_1.z
            .string()
            .regex(/^\d{1,4}$/, 'Room number must be a number between 1 and 4 digits.')
            .nonempty('Room number is required.'),
        floorNumber: zod_1.z
            .string()
            .regex(/^\d{1,2}$/, 'Floor number must be a number between 1 and 2 digits.')
            .nonempty('Floor number is required.'),
        createdBy: zod_1.z.string().optional(),
        testAvailability: zod_1.z.boolean().optional(),
        isDeleted: zod_1.z.boolean().optional(),
    }),
});
const updateTestValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        testName: zod_1.z
            .string()
            .trim()
            .min(3, 'Test name must be contain at least 03 characters')
            .max(100, 'Test name can not exceed 100 characters')
            .optional(),
        testDescription: zod_1.z
            .string()
            .trim()
            .min(3, 'Test description must be contain at least 03 characters')
            .max(500, 'Test description can not exceed 500 characters')
            .optional(),
        testCategory: zod_1.z
            .enum([
            'diagnostic',
            'clinical',
            'radiology',
            'pathology',
            'microbiology',
            'biochemistry',
            'hematology',
            'immunology',
            'genetics',
            'toxicology',
        ])
            .optional(),
        price: zod_1.z
            .number()
            .positive('Price must be a positive number.')
            .min(1, 'Price must be at least 1.')
            .max(1000000, 'Price cannot exceed 1,000,000.')
            .optional(),
        duration: zod_1.z
            .string()
            .regex(/^\d{1,3} (minutes?|hours?)$/, "Duration must be in the format 'X minutes' or 'X hours'.")
            .optional(),
        testPreparation: zod_1.z
            .string()
            .max(500, 'Test preparation instructions cannot exceed 500 characters.')
            .optional(),
        testMethodology: zod_1.z
            .string()
            .max(1000, 'Test methodology cannot exceed 1000 characters.')
            .optional(),
        roomNumber: zod_1.z
            .string()
            .regex(/^\d{1,4}$/, 'Room number must be a number between 1 and 4 digits.')
            .optional(),
        floorNumber: zod_1.z
            .string()
            .regex(/^\d{1,2}$/, 'Floor number must be a number between 1 and 2 digits.')
            .optional(),
        createdBy: zod_1.z.string().optional(),
        testAvailability: zod_1.z.boolean().optional(),
        isDeleted: zod_1.z.boolean().optional(),
    }),
});
const testAvailabilityUpdateValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        testAvailability: zod_1.z.boolean(),
    }),
});
exports.TestValidationSchema = {
    createTestValidationSchema,
    updateTestValidationSchema,
    testAvailabilityUpdateValidationSchema,
};
