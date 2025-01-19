"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaffRoleValidationSchema = void 0;
const zod_1 = require("zod");
exports.StaffRoleValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string()
            .trim()
            .min(3, 'Staff role name is required and must contain at least 03 characters')
            .max(50, 'Staff role name can not exceed 50 characters'),
        createdBy: zod_1.z.string().optional(),
        isDeleted: zod_1.z.boolean().default(false),
    }),
});
