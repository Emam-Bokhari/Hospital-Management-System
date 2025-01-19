import { z } from "zod";

const createContactInformationValidationSchema = z.object({
    phone: z
        .string()
        .trim()
        .regex(/^\+\d{1,4}\d{7,15}$/, { message: 'Invalid phone number format!' }),
    email: z
        .string()
        .trim()
        .email('Invalid email format')
        .max(100, 'Email cannot exceed 100 characters').optional(),
});

const updateContactInformationValidationSchema = z.object({
    phone: z
        .string()
        .trim()
        .regex(/^\+\d{1,4}\d{7,15}$/, { message: 'Invalid phone number format!' }).optional(),
    email: z
        .string()
        .trim()
        .email('Invalid email format')
        .max(100, 'Email cannot exceed 100 characters').optional(),
});


const createEmergencyContactValidationSchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, 'Name is required and must contain at least 2 characters')
        .max(50, 'Name cannot exceed 50 characters')
        .regex(
            /^[a-zA-Z\-'\s]+$/,
            'Name can only contain letters, spaces, hyphens, or apostrophes',
        ),
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
    relationship: z
        .string()
        .trim()
        .min(3, 'Relationship is required and must contain at least 3 characters')
        .max(50, 'Relationship cannot exceed 50 characters'),
});

const updateEmergencyContactValidationSchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, 'Name is required and must contain at least 2 characters')
        .max(50, 'Name cannot exceed 50 characters')
        .regex(
            /^[a-zA-Z\-'\s]+$/,
            'Name can only contain letters, spaces, hyphens, or apostrophes',
        ).optional(),
    phone: z
        .string()
        .trim()
        .regex(/^\+\d{1,4}\d{7,15}$/, { message: 'Invalid phone number format!' }).optional(),
    email: z
        .string()
        .trim()
        .email('Invalid email format')
        .max(100, 'Email cannot exceed 100 characters')
        .optional(),
    relationship: z
        .string()
        .trim()
        .min(3, 'Relationship is required and must contain at least 3 characters')
        .max(50, 'Relationship cannot exceed 50 characters').optional(),
});

const createAddressValidationSchema = z.object({
    permanent: z.string()
        .trim()
        .min(5, 'Permanent address is required and must contain at least 5 characters')
        .max(100, 'Permanent address cannot exceed 100 characters'),
    current: z.string()
        .trim()
        .min(5, 'Current address is required and must contain at least 5 characters')
        .max(100, 'Current address cannot exceed 100 characters')
})

const updateAddressValidationSchema = z.object({
    permanent: z.string()
        .trim()
        .min(5, 'Permanent address is required and must contain at least 5 characters')
        .max(100, 'Permanent address cannot exceed 100 characters').optional(),
    current: z.string()
        .trim()
        .min(5, 'Current address is required and must contain at least 5 characters')
        .max(100, 'Current address cannot exceed 100 characters').optional()
})

const createNidValidationSchema = z.object({
    number: z.string().trim().regex(/^\d{10}$/, {
        message: 'NID number must be exactly 10 digits.',
    }),
    scannedCopy: z.string()
        .nonempty({ message: 'Scanned copy is required.' })
        .url({ message: 'Scanned copy must be a valid URL.' }),
})

const updateNidValidationSchema = z.object({
    number: z.string().trim().regex(/^\d{10}$/, {
        message: 'NID number must be exactly 10 digits.',
    }).optional(),
    scannedCopy: z.string()
        .nonempty({ message: 'Scanned copy is required.' })
        .url({ message: 'Scanned copy must be a valid URL.' }).optional(),
});

const createBirthCertificateValidationSchema = z.object({
    number: z.string()
        .trim()
        .regex(/^\d{17}$/, {
            message: 'Birth certificate number must be exactly 17 digits.',
        }),
    scannedCopy: z
        .string()
        .nonempty({ message: 'Scanned copy of the birth certificate is required.' })
        .url({ message: 'Scanned copy must be a valid URL.' }),
});

const updateBirthCertificateValidationSchema = z.object({
    number: z.string()
        .trim()
        .regex(/^\d{17}$/, {
            message: 'Birth certificate number must be exactly 17 digits.',
        }).optional(),
    scannedCopy: z
        .string()
        .nonempty({ message: 'Scanned copy of the birth certificate is required.' })
        .url({ message: 'Scanned copy must be a valid URL.' }).optional(),
});

const createGuardianValidationSchema = z.object({
    name: z.string()
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
    nidNumber: z.string().trim().regex(/^\d{10}$/, {
        message: 'NID number must be exactly 10 digits.',
    }),
    nidScannedCopy: z.string()
        .nonempty({ message: 'NID Scanned copy is required.' })
        .url({ message: 'NID Scanned copy must be a valid URL.' }),
    birthCertificateNumber: z
        .string()
        .trim()
        .regex(/^\d{17}$/, {
            message: 'Birth certificate number must be exactly 17 digits.',
        }).optional(),
    birthCertificateScannedCopy: z
        .string()
        .url({ message: 'Birth certificate scanned copy must be a valid URL.' }).optional()
})

const updateGuardianValidationSchema = z.object({
    name: z.string()
        .trim()
        .min(2, 'Name is required and must contain at least 2 characters')
        .max(100, 'Name cannot exceed 100 characters').optional(),
    relationship: z
        .string()
        .trim()
        .min(3, 'Relationship is required and must contain at least 3 characters')
        .max(50, 'Relationship cannot exceed 50 characters').optional(),
    phone: z
        .string()
        .trim()
        .regex(/^\+\d{1,4}\d{7,15}$/, { message: 'Invalid phone number format!' }).optional(),
    email: z
        .string()
        .trim()
        .email('Invalid email format')
        .max(100, 'Email cannot exceed 100 characters')
        .optional(),
    nidNumber: z.string().trim().regex(/^\d{10}$/, {
        message: 'NID number must be exactly 10 digits.',
    }).optional(),
    nidScannedCopy: z.string()
        .nonempty({ message: 'NID Scanned copy is required.' })
        .url({ message: 'NID Scanned copy must be a valid URL.' }).optional(),
    birthCertificateNumber: z
        .string()
        .trim()
        .regex(/^\d{17}$/, {
            message: 'Birth certificate number must be exactly 17 digits.',
        }).optional(),
    birthCertificateScannedCopy: z
        .string()
        .url({ message: 'Birth certificate scanned copy must be a valid URL.' }).optional()
})

const createWorkScheduleValidationSchema = z.object({
    shiftType: z.enum(["morning", "evening", "night"]),
    startTime: z
        .string()
        .regex(
            /^(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])$/,
            'Time slot must be in HH:mm 24-hour format',
        ),
    endTime: z
        .string()
        .regex(
            /^(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])$/,
            'Time slot must be in HH:mm 24-hour format',
        ),
})

const updateWorkScheduleValidationSchema = z.object({
    shiftType: z.enum(["morning", "evening", "night"]).optional(),
    startTime: z
        .string()
        .regex(
            /^(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])$/,
            'Time slot must be in HH:mm 24-hour format',
        ).optional(),
    endTime: z
        .string()
        .regex(
            /^(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])$/,
            'Time slot must be in HH:mm 24-hour format',
        ).optional(),
})


const createPayrollInformationValidationSchema = z.object({
    monthlySalary: z.number({ invalid_type_error: 'Monthly salary must be a numeric value.' })
        .positive({ message: 'Monthly salary must be a positive value.' })
        .min(1000, { message: 'Monthly salary must be at least 1000.' }),
    paymentMethod: z.enum(["bankTransfer", "cheque", "cash"]),
    bankName: z.string().optional(),
    accountNumber: z.string().optional(),
    branchCode: z.string().optional(),
});

const updatePayrollInformationValidationSchema = z.object({
    monthlySalary: z.number({ invalid_type_error: 'Monthly salary must be a numeric value.' })
        .positive({ message: 'Monthly salary must be a positive value.' })
        .min(1000, { message: 'Monthly salary must be at least 1000.' }).optional(),
    paymentMethod: z.enum(["bankTransfer", "cheque", "cash"]).optional(),
    bankName: z.string().optional(),
    accountNumber: z.string().optional(),
    branchCode: z.string().optional(),
});

const createEducationDetailsValidationSchema = z.object({
    highestEducation: z
        .string()
        .trim()
        .min(2, 'Highest education is required and must contain at least 2 characters')
        .max(100, 'Highest education cannot exceed 100 characters'),
    certificateScannedCopy: z
        .string()
        .nonempty({ message: 'Certificate scanned copy is required.' })
        .url({ message: 'Certificate scanned copy must be a valid URL.' }),
    institution: z
        .string()
        .trim()
        .min(2, 'Institution is required and must contain at least 2 characters')
        .max(150, 'Institution cannot exceed 150 characters'),
    yearOfGraduation: z
        .string()
        .regex(/^\d{4}$/, { message: 'Year of graduation must be a 4-digit year.' })
});

const updateEducationDetailsValidationSchema = z.object({
    highestEducation: z
        .string()
        .trim()
        .min(2, 'Highest education is required and must contain at least 2 characters')
        .max(150, 'Highest education cannot exceed 150 characters').optional(),
    certificateScannedCopy: z
        .string()
        .url({ message: 'Certificate scanned copy must be a valid URL.' }).optional(),
    institution: z
        .string()
        .trim()
        .min(2, 'Institution is required and must contain at least 2 characters')
        .max(150, 'Institution cannot exceed 150 characters').optional(),
    yearOfGraduation: z
        .string()
        .regex(/^\d{4}$/, { message: 'Year of graduation must be a 4-digit year.' }).optional()
});

const createExperienceValidationSchema = z.object({
    previousCompany: z.string().trim().min(2, 'Previous company is required and must contain at least 2 characters')
        .max(100, 'Previous company cannot exceed 100 characters'),
    previousJobTitle: z.string().trim().min(2, 'Previous job title is required and must contain at least 2 characters')
        .max(100, 'Previous job title cannot exceed 100 characters'),
    totalYearsOfExperience: z.number({ invalid_type_error: 'Total years of experience must be a numeric value.' })
        .positive({ message: 'Total years of experience must be a positive number.' }).max(50, { message: 'Total years of experience cannot exceed 50 years.' }),
    reasonForLeaving: z.string().trim().min(5, 'Reason for leaving is required and must contain at least 2 characters')
        .max(500, 'Reason for leaving cannot exceed 100 characters'),
})

const updateExperienceValidationSchema = z.object({
    previousCompany: z.string().trim().min(2, 'Previous company is required and must contain at least 2 characters')
        .max(100, 'Previous company cannot exceed 100 characters').optional(),
    previousJobTitle: z.string().trim().min(2, 'Previous job title is required and must contain at least 2 characters')
        .max(100, 'Previous job title cannot exceed 100 characters').optional(),
    totalYearsOfExperience: z.number({ invalid_type_error: 'Total years of experience must be a numeric value.' })
        .positive({ message: 'Total years of experience must be a positive number.' }).max(50, { message: 'Total years of experience cannot exceed 50 years.' }).optional(),
    reasonForLeaving: z.string().trim().min(5, 'Reason for leaving is required and must contain at least 5 characters')
        .max(500, 'Reason for leaving cannot exceed 500 characters').optional(),
})


const createStaffValidationSchema = z.object({
    body: z.object({
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
        gender: z.enum(["male", "female"]),
        dateOfBirth: z
            .string()
            .length(10)
            .regex(
                /^\d{4}-\d{2}-\d{2}$/,
                'Date of birth must be in YYYY-MM-DD format',
            ),
        bloodGroup: z
            .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
            .optional(),
        profilePicture: z.string().max(500, 'Profile picture url can not exceed 500 characters')
            .optional(),
        contactInformation: createContactInformationValidationSchema,
        emergencyContact: createEmergencyContactValidationSchema,
        nationality: z
            .string()
            .trim()
            .min(2, 'Nationality is required and must contain at least 2 characters')
            .max(50, 'Nationality can not exceed 50 characters')
        ,
        religion: z
            .string()
            .trim()
            .min(3, 'Religion is required and must contain at least 3 characters')
            .max(50, 'Religion can not exceed 50 characters')
        ,
        address: createAddressValidationSchema,
        nid: createNidValidationSchema.optional(),
        birthCertificate: createBirthCertificateValidationSchema,
        guardian: createGuardianValidationSchema,
        staffRole: z.string(),
        employmentType: z.enum(["fullTime", "partTime", "contractual"]),
        employmentID: z.string().optional(),
        dateOfJoining: z.string().length(10)
            .regex(
                /^\d{4}-\d{2}-\d{2}$/,
                'Date of joining must be in YYYY-MM-DD format',
            ),
        workSchedule: createWorkScheduleValidationSchema,
        payrollInformation: createPayrollInformationValidationSchema,
        educationDetails: createEducationDetailsValidationSchema,
        experience: createExperienceValidationSchema.optional(),
        createdBy: z.string().optional(),
        isDeleted: z.boolean().default(false)
    })
})

const updateStaffValidationSchema = z.object({
    body: z.object({
        firstName: z
            .string()
            .trim()
            .min(2, 'First name is required and must contain at least 2 characters')
            .max(50, 'First name cannot exceed 50 characters')
            .regex(
                /^[a-zA-Z\-'\s]+$/,
                'First name can only contain letters, spaces, hyphens, or apostrophes',
            ).optional(),
        lastName: z
            .string()
            .trim()
            .min(2, 'Last name is required and must contain at least 2 characters')
            .max(50, 'Last name cannot exceed 50 characters')
            .regex(
                /^[a-zA-Z\-'\s]+$/,
                'Last name can only contain letters, spaces, hyphens, or apostrophes',
            ).optional(),
        gender: z.enum(["male", "female"]).optional(),
        dateOfBirth: z
            .string()
            .length(10)
            .regex(
                /^\d{4}-\d{2}-\d{2}$/,
                'Date of birth must be in YYYY-MM-DD format',
            ).optional(),
        bloodGroup: z
            .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
            .optional(),
        profilePicture: z.string().max(500, 'Profile picture url can not exceed 500 characters')
            .optional(),
        contactInformation: updateContactInformationValidationSchema.optional(),
        emergencyContact: updateEmergencyContactValidationSchema.optional(),
        nationality: z
            .string()
            .trim()
            .min(2, 'Nationality is required and must contain at least 2 characters')
            .max(50, 'Nationality can not exceed 50 characters').optional()
        ,
        religion: z
            .string()
            .trim()
            .min(3, 'Religion is required and must contain at least 3 characters')
            .max(50, 'Religion can not exceed 50 characters').optional()
        ,
        address: updateAddressValidationSchema.optional(),
        nid: updateNidValidationSchema.optional(),
        birthCertificate: updateBirthCertificateValidationSchema.optional(),
        guardian: updateGuardianValidationSchema.optional(),
        staffRole: z.string().optional(),
        employmentType: z.enum(["fullTime", "partTime", "contractual"]).optional(),
        employmentID: z.string().optional(),
        dateOfJoining: z.string().length(10)
            .regex(
                /^\d{4}-\d{2}-\d{2}$/,
                'Date of joining must be in YYYY-MM-DD format',
            ).optional(),
        workSchedule: updateWorkScheduleValidationSchema.optional(),
        payrollInformation: updatePayrollInformationValidationSchema.optional(),
        educationDetails: updateEducationDetailsValidationSchema.optional(),
        experience: updateExperienceValidationSchema.optional(),
        createdBy: z.string().optional(),
        isDeleted: z.boolean().default(false)
    })
})

export const StaffValidationSchema = {
    createStaffValidationSchema,
    updateStaffValidationSchema,
}