"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoctorValidationSchema = void 0;
const zod_1 = require("zod");
const createContactInformationValidationSchema = zod_1.z.object({
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
const updateContactInformationValidationSchema = zod_1.z.object({
    phone: zod_1.z
        .string()
        .trim()
        .regex(/^\+\d{1,4}\d{7,15}$/, { message: 'Invalid phone number format!' })
        .optional(),
    email: zod_1.z
        .string()
        .email('Invalid email format')
        .max(100, 'Email cannot exceed 100 characters')
        .optional(),
});
const createEmergencyContactValidationSchema = zod_1.z.object({
    name: zod_1.z
        .string()
        .trim()
        .min(2, 'Name is required and must contain at least 2 characters')
        .max(50, 'Name cannot exceed 50 characters')
        .regex(/^[a-zA-Z\-'\s]+$/, 'Name can only contain letters, spaces, hyphens, or apostrophes'),
    phone: zod_1.z
        .string()
        .trim()
        .regex(/^\+\d{1,4}\d{7,15}$/, { message: 'Invalid phone number format!' }),
    email: zod_1.z
        .string()
        .email('Invalid email format')
        .max(100, 'Email cannot exceed 100 characters')
        .optional(),
    relationship: zod_1.z
        .string()
        .trim()
        .min(3, 'Relationship is required and must contain at least 3 characters')
        .max(50, 'Relationship cannot exceed 50 characters'),
});
const updateEmergencyContactValidationSchema = zod_1.z.object({
    name: zod_1.z
        .string()
        .trim()
        .min(2, 'Name is required and must contain at least 2 characters')
        .max(50, 'Name cannot exceed 50 characters')
        .regex(/^[a-zA-Z\-'\s]+$/, 'Name can only contain letters, spaces, hyphens, or apostrophes')
        .optional(),
    phone: zod_1.z
        .string()
        .trim()
        .regex(/^\+\d{1,4}\d{7,15}$/, { message: 'Invalid phone number format!' })
        .optional(),
    email: zod_1.z
        .string()
        .email('Invalid email format')
        .max(100, 'Email cannot exceed 100 characters')
        .optional(),
    relationship: zod_1.z
        .string()
        .trim()
        .min(3, 'Relationship is required and must contain at least 3 characters')
        .max(50, 'Relationship cannot exceed 50 characters')
        .optional(),
});
const createPreviousWorkPlaceValidationSchema = zod_1.z.object({
    companyName: zod_1.z
        .string()
        .trim()
        .min(3, 'Company name is required and must contain at least 3 characters')
        .max(100, 'Company name cannot exceed 100 characters'),
    position: zod_1.z
        .string()
        .trim()
        .min(5, 'Position is required and must contain at least 5 characters')
        .max(100, 'Position cannot exceed 100 characters'),
    startDate: zod_1.z.string(),
    endDate: zod_1.z.string(),
});
const updatePreviousWorkPlaceValidationSchema = zod_1.z.object({
    companyName: zod_1.z
        .string()
        .trim()
        .min(3, 'Company name is required and must contain at least 3 characters')
        .max(100, 'Company name cannot exceed 100 characters')
        .optional(),
    position: zod_1.z
        .string()
        .trim()
        .min(5, 'Position is required and must contain at least 5 characters')
        .max(100, 'Position cannot exceed 100 characters')
        .optional(),
    startDate: zod_1.z.string().optional(),
    endDate: zod_1.z.string().optional(),
});
const createEducationalDetailsValidationSchema = zod_1.z.object({
    universityName: zod_1.z
        .string()
        .trim()
        .min(2, 'University name is required and must contain at least 2 characters')
        .max(100, 'University name cannot exceed 100 characters'),
    degreeEarned: zod_1.z
        .string()
        .trim()
        .min(2, 'Degree earned field is required and must contain at least 2 characters')
        .max(50, 'Degree earned field cannot exceed 50 characters'),
    duration: zod_1.z
        .string()
        .min(4, 'Duration is required and must contain at least 4 characters')
        .max(20, 'Duration cannot exceed 20 characters'),
    universityLocation: zod_1.z
        .string()
        .min(3, 'University location is required and must contain at least 3 characters')
        .max(100, 'University location cannot exceed 100 characters'),
    universityWebsite: zod_1.z
        .string()
        .max(200, 'University website url cannot exceed 200 characters')
        .optional(),
});
const updateEducationalDetailsValidationSchema = zod_1.z.object({
    universityName: zod_1.z
        .string()
        .trim()
        .min(2, 'University name is required and must contain at least 2 characters')
        .max(100, 'University name cannot exceed 100 characters')
        .optional(),
    degreeEarned: zod_1.z
        .string()
        .trim()
        .min(2, 'Degree earned field is required and must contain at least 2 characters')
        .max(50, 'Degree earned field cannot exceed 50 characters')
        .optional(),
    duration: zod_1.z
        .string()
        .min(4, 'Duration is required and must contain at least 4 characters')
        .max(20, 'Duration cannot exceed 20 characters')
        .optional(),
    universityLocation: zod_1.z
        .string()
        .min(3, 'University location is required and must contain at least 3 characters')
        .max(100, 'University location cannot exceed 100 characters')
        .optional(),
    universityWebsite: zod_1.z
        .string()
        .max(200, 'University website url cannot exceed 200 characters')
        .optional(),
});
const createAwardsValidationSchema = zod_1.z.object({
    awardName: zod_1.z
        .string()
        .trim()
        .min(3, 'Award name is required and must contain at least 3 characters')
        .max(100, 'Award name cannot exceed 100 characters'),
    awardCategory: zod_1.z
        .string()
        .max(50, 'Award category cannot exceed 50 characters')
        .optional(),
    awardYear: zod_1.z
        .string()
        .min(4, 'Award year is required')
        .max(4, 'Award year cannot exceed 4 characters'),
    awardDescription: zod_1.z
        .string()
        .trim()
        .min(10, 'Award description is required')
        .max(500, 'Award description cannot exceed 500 characters'),
    issuingOrganization: zod_1.z
        .string()
        .trim()
        .max(100, 'Award issuing organization cannot exceed 100 characters')
        .optional(),
});
const updateAwardsValidationSchema = zod_1.z.object({
    awardName: zod_1.z
        .string()
        .trim()
        .min(3, 'Award name is required and must contain at least 3 characters')
        .max(100, 'Award name cannot exceed 100 characters')
        .optional(),
    awardCategory: zod_1.z
        .string()
        .max(50, 'Award category cannot exceed 50 characters')
        .optional(),
    awardYear: zod_1.z
        .string()
        .min(4, 'Award year is required')
        .max(4, 'Award year cannot exceed 4 characters')
        .optional(),
    awardDescription: zod_1.z
        .string()
        .trim()
        .min(10, 'Award description is required')
        .max(500, 'Award description cannot exceed 500 characters')
        .optional(),
    issuingOrganization: zod_1.z
        .string()
        .trim()
        .max(100, 'Award issuing organization cannot exceed 100 characters')
        .optional(),
});
const createMedicalPracticeInformationValidationSchema = zod_1.z.object({
    hospitalAffiliation: zod_1.z
        .string()
        .trim()
        .min(3, 'Hospital affiliation name is required and must contain at least 3 characters')
        .max(100, 'Hospital affiliation cannot exceed 100 characters'),
    chamberAddress: zod_1.z
        .string()
        .trim()
        .min(5, 'Chamber address is required and must contain at least 5 characters')
        .max(200, 'Chamber address cannot exceed 200 characters'),
});
const updateMedicalPracticeInformationValidationSchema = zod_1.z.object({
    hospitalAffiliation: zod_1.z
        .string()
        .trim()
        .min(3, 'Hospital affiliation name is required and must contain at least 3 characters')
        .max(100, 'Hospital affiliation cannot exceed 100 characters')
        .optional(),
    chamberAddress: zod_1.z
        .string()
        .trim()
        .min(5, 'Chamber address is required and must contain at least 5 characters')
        .max(200, 'Chamber address cannot exceed 200 characters')
        .optional(),
});
const createDoctorValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.string().optional(),
        specialization: zod_1.z.string(),
        department: zod_1.z.string().optional(),
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
        gender: zod_1.z.enum(['male', 'female']),
        dateOfBirth: zod_1.z
            .string()
            .length(10)
            .regex(/^\d{4}-\d{2}-\d{2}$/, 'Date of birth must be in YYYY-MM-DD format'),
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
        profilePicture: zod_1.z
            .string()
            .max(500, 'Profile picture url can not exceed 500 characters')
            .optional(),
        contactInformation: createContactInformationValidationSchema,
        emergencyContact: createEmergencyContactValidationSchema,
        educationDetails: zod_1.z.array(createEducationalDetailsValidationSchema),
        qualifications: zod_1.z
            .array(zod_1.z.string().min(2).max(100), {
            required_error: 'At least one qualification is required',
        })
            .nonempty('Qualifications cannot be empty.'),
        licenseNumber: zod_1.z
            .string()
            .min(5, 'License number must have at least 5 characters'),
        licenseExpiryDate: zod_1.z
            .string()
            .regex(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/, 'Invalid date format (YYYY-MM-DD)')
            .refine((value) => new Date(value) > new Date(), 'License expiry date must be in the future'),
        previousWorkPlace: zod_1.z
            .array(createPreviousWorkPlaceValidationSchema)
            .optional(),
        yearsOfExperience: zod_1.z.number().max(50).optional(),
        medicalPracticeInformation: createMedicalPracticeInformationValidationSchema,
        awards: zod_1.z.array(createAwardsValidationSchema).optional(),
        workingDays: zod_1.z
            .array(zod_1.z.enum([
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday',
        ]))
            .nonempty('At least one working day must be selected.'),
        workingHours: zod_1.z
            .array(zod_1.z.object({
            startTime: zod_1.z
                .string()
                .regex(/^(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])$/, 'Time slot must be in HH:mm 24-hour format'),
            endTime: zod_1.z
                .string()
                .regex(/^(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])$/, 'Time slot must be in HH:mm 24-hour format'),
        }))
            .nonempty('Working hours must include at least one time range.'),
        offDays: zod_1.z
            .array(zod_1.z.enum([
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday',
        ]))
            .nonempty('At least one off day must be selected.'),
        isDeleted: zod_1.z.boolean().default(false),
    }),
});
const updateDoctorValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.string().optional(),
        specialization: zod_1.z.string().optional(),
        department: zod_1.z.string().optional(),
        firstName: zod_1.z
            .string()
            .trim()
            .min(2, 'First name is required and must contain at least 2 characters')
            .max(50, 'First name cannot exceed 50 characters')
            .regex(/^[a-zA-Z\-'\s]+$/, 'First name can only contain letters, spaces, hyphens, or apostrophes')
            .optional(),
        lastName: zod_1.z
            .string()
            .trim()
            .min(2, 'Last name is required and must contain at least 2 characters')
            .max(50, 'Last name cannot exceed 50 characters')
            .regex(/^[a-zA-Z\-'\s]+$/, 'Last name can only contain letters, spaces, hyphens, or apostrophes')
            .optional(),
        gender: zod_1.z.enum(['male', 'female']).optional(),
        dateOfBirth: zod_1.z
            .string()
            .length(10)
            .regex(/^\d{4}-\d{2}-\d{2}$/, 'Date of birth must be in YYYY-MM-DD format')
            .optional(),
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
        profilePicture: zod_1.z
            .string()
            .max(500, 'Profile picture url can not exceed 500 characters')
            .optional(),
        contactInformation: updateContactInformationValidationSchema.optional(),
        emergencyContact: updateEmergencyContactValidationSchema.optional(),
        educationDetails: zod_1.z
            .array(updateEducationalDetailsValidationSchema)
            .optional(),
        qualifications: zod_1.z
            .array(zod_1.z.string().min(2).max(100), {
            required_error: 'At least one qualification is required',
        })
            .optional(),
        licenseNumber: zod_1.z
            .string()
            .min(5, 'License number must have at least 5 characters')
            .optional(),
        licenseExpiryDate: zod_1.z
            .string()
            .regex(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/, 'Invalid date format (YYYY-MM-DD)')
            .refine((value) => new Date(value) > new Date(), 'License expiry date must be in the future')
            .optional(),
        previousWorkPlace: zod_1.z
            .array(updatePreviousWorkPlaceValidationSchema)
            .optional(),
        yearsOfExperience: zod_1.z.number().max(50).optional(),
        medicalPracticeInformation: updateMedicalPracticeInformationValidationSchema.optional(),
        awards: zod_1.z.array(updateAwardsValidationSchema).optional(),
        workingDays: zod_1.z
            .array(zod_1.z.enum([
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday',
        ]))
            .optional(),
        workingHours: zod_1.z
            .array(zod_1.z.object({
            startTime: zod_1.z
                .string()
                .regex(/^(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])$/, 'Time slot must be in HH:mm 24-hour format'),
            endTime: zod_1.z
                .string()
                .regex(/^(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])$/, 'Time slot must be in HH:mm 24-hour format'),
        }))
            .optional(),
        offDays: zod_1.z
            .array(zod_1.z.enum([
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday',
        ]))
            .optional(),
        isDeleted: zod_1.z.boolean().default(false),
    }),
});
exports.DoctorValidationSchema = {
    createDoctorValidationSchema,
    updateDoctorValidationSchema,
};
