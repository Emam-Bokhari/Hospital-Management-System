"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpecializationValidationSchema = void 0;
const zod_1 = require("zod");
exports.SpecializationValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string()
            .trim()
            .min(3, 'Specialization name is required and must contain at least 3 characters')
            .max(100, 'Specialization name cannot exceed 100 characters'),
        createdBy: zod_1.z.string().optional(),
        isDeleted: zod_1.z.boolean().default(false),
    }),
});
