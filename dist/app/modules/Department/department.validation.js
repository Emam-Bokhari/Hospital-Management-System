"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepartmentValidationSchema = void 0;
const zod_1 = require("zod");
const createSymptomsAddressed = zod_1.z.object({
    symptom: zod_1.z
        .string()
        .trim()
        .min(3, 'Symptom is required and must contain at least 03 characters')
        .max(500, 'Symptom can not exceed 500 characters'),
    description: zod_1.z
        .string()
        .trim()
        .min(20, 'Description is required and must contain at least 20 characters')
        .max(1000, 'Description can not exceed 1000 characters'),
});
const updateSymptomsAddressed = zod_1.z.object({
    symptom: zod_1.z
        .string()
        .trim()
        .min(3, 'Symptom is required and must contain at least 03 characters')
        .max(500, 'Symptom can not exceed 500 characters')
        .optional(),
    description: zod_1.z
        .string()
        .trim()
        .min(20, 'Description is required and must contain at least 20 characters')
        .max(1000, 'Description can not exceed 1000 characters')
        .optional(),
});
const createPossibleCauses = zod_1.z.object({
    cause: zod_1.z
        .string()
        .trim()
        .min(3, 'Cause is required and must contain at least 03 characters')
        .max(500, 'Cause can not exceed 500 characters'),
    description: zod_1.z
        .string()
        .trim()
        .min(20, 'Description is required and must contain at least 20 characters')
        .max(1000, 'Description can not exceed 1000 characters'),
});
const updatePossibleCauses = zod_1.z.object({
    cause: zod_1.z
        .string()
        .trim()
        .min(3, 'Cause is required and must contain at least 03 characters')
        .max(500, 'Cause can not exceed 500 characters')
        .optional(),
    description: zod_1.z
        .string()
        .trim()
        .min(20, 'Description is required and must contain at least 20 characters')
        .max(1000, 'Description can not exceed 1000 characters')
        .optional(),
});
const createDepartmentValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        specialization: zod_1.z.string(),
        departmentName: zod_1.z.string().optional(),
        overview: zod_1.z
            .string()
            .trim()
            .min(10, 'Overview is required and must contain at least 10 characters')
            .max(500, 'Overview can not exceed 500 characters'),
        description: zod_1.z
            .string()
            .trim()
            .min(20, 'Description is required and must contain at least 20 characters')
            .max(1000, 'Description can not exceed 1000 characters'),
        symptomsAddressed: zod_1.z.array(createSymptomsAddressed),
        possibleCauses: zod_1.z.array(createPossibleCauses),
        status: zod_1.z.enum(['active', 'inActive']).default('active'),
        createdBy: zod_1.z.string().optional(),
        isDeleted: zod_1.z.boolean().default(false),
    }),
});
const updateDepartmentValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        specialization: zod_1.z.string().optional(),
        departmentName: zod_1.z.string().optional(),
        overview: zod_1.z
            .string()
            .trim()
            .min(10, 'Overview is required and must contain at least 10 characters')
            .max(500, 'Overview can not exceed 500 characters')
            .optional(),
        description: zod_1.z
            .string()
            .trim()
            .min(20, 'Description is required and must contain at least 20 characters')
            .max(1000, 'Description can not exceed 1000 characters')
            .optional(),
        symptomsAddressed: zod_1.z.array(updateSymptomsAddressed).optional(),
        possibleCauses: zod_1.z.array(updatePossibleCauses).optional(),
        status: zod_1.z.enum(['active', 'inActive']).default('active'),
        createdBy: zod_1.z.string().optional(),
        isDeleted: zod_1.z.boolean().default(false),
    }),
});
exports.DepartmentValidationSchema = {
    createDepartmentValidationSchema,
    updateDepartmentValidationSchema,
};
