'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.StaffValidationSchema = void 0;
const zod_1 = require('zod');
const createContactInformationValidationSchema = zod_1.z.object({
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
});
const updateContactInformationValidationSchema = zod_1.z.object({
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
});
const createEmergencyContactValidationSchema = zod_1.z.object({
  name: zod_1.z
    .string()
    .trim()
    .min(2, 'Name is required and must contain at least 2 characters')
    .max(50, 'Name cannot exceed 50 characters')
    .regex(
      /^[a-zA-Z\-'\s]+$/,
      'Name can only contain letters, spaces, hyphens, or apostrophes',
    ),
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
    .regex(
      /^[a-zA-Z\-'\s]+$/,
      'Name can only contain letters, spaces, hyphens, or apostrophes',
    )
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
  relationship: zod_1.z
    .string()
    .trim()
    .min(3, 'Relationship is required and must contain at least 3 characters')
    .max(50, 'Relationship cannot exceed 50 characters')
    .optional(),
});
const createAddressValidationSchema = zod_1.z.object({
  permanent: zod_1.z
    .string()
    .trim()
    .min(
      5,
      'Permanent address is required and must contain at least 5 characters',
    )
    .max(100, 'Permanent address cannot exceed 100 characters'),
  current: zod_1.z
    .string()
    .trim()
    .min(
      5,
      'Current address is required and must contain at least 5 characters',
    )
    .max(100, 'Current address cannot exceed 100 characters'),
});
const updateAddressValidationSchema = zod_1.z.object({
  permanent: zod_1.z
    .string()
    .trim()
    .min(
      5,
      'Permanent address is required and must contain at least 5 characters',
    )
    .max(100, 'Permanent address cannot exceed 100 characters')
    .optional(),
  current: zod_1.z
    .string()
    .trim()
    .min(
      5,
      'Current address is required and must contain at least 5 characters',
    )
    .max(100, 'Current address cannot exceed 100 characters')
    .optional(),
});
const createNidValidationSchema = zod_1.z.object({
  number: zod_1.z
    .string()
    .trim()
    .regex(/^\d{10}$/, {
      message: 'NID number must be exactly 10 digits.',
    }),
  scannedCopy: zod_1.z
    .string()
    .nonempty({ message: 'Scanned copy is required.' })
    .url({ message: 'Scanned copy must be a valid URL.' }),
});
const updateNidValidationSchema = zod_1.z.object({
  number: zod_1.z
    .string()
    .trim()
    .regex(/^\d{10}$/, {
      message: 'NID number must be exactly 10 digits.',
    })
    .optional(),
  scannedCopy: zod_1.z
    .string()
    .nonempty({ message: 'Scanned copy is required.' })
    .url({ message: 'Scanned copy must be a valid URL.' })
    .optional(),
});
const createBirthCertificateValidationSchema = zod_1.z.object({
  number: zod_1.z
    .string()
    .trim()
    .regex(/^\d{17}$/, {
      message: 'Birth certificate number must be exactly 17 digits.',
    }),
  scannedCopy: zod_1.z
    .string()
    .nonempty({ message: 'Scanned copy of the birth certificate is required.' })
    .url({ message: 'Scanned copy must be a valid URL.' }),
});
const updateBirthCertificateValidationSchema = zod_1.z.object({
  number: zod_1.z
    .string()
    .trim()
    .regex(/^\d{17}$/, {
      message: 'Birth certificate number must be exactly 17 digits.',
    })
    .optional(),
  scannedCopy: zod_1.z
    .string()
    .nonempty({ message: 'Scanned copy of the birth certificate is required.' })
    .url({ message: 'Scanned copy must be a valid URL.' })
    .optional(),
});
const createGuardianValidationSchema = zod_1.z.object({
  name: zod_1.z
    .string()
    .trim()
    .min(2, 'Name is required and must contain at least 2 characters')
    .max(100, 'Name cannot exceed 100 characters'),
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
    }),
  nidScannedCopy: zod_1.z
    .string()
    .nonempty({ message: 'NID Scanned copy is required.' })
    .url({ message: 'NID Scanned copy must be a valid URL.' }),
  birthCertificateNumber: zod_1.z
    .string()
    .trim()
    .regex(/^\d{17}$/, {
      message: 'Birth certificate number must be exactly 17 digits.',
    })
    .optional(),
  birthCertificateScannedCopy: zod_1.z
    .string()
    .url({ message: 'Birth certificate scanned copy must be a valid URL.' })
    .optional(),
});
const updateGuardianValidationSchema = zod_1.z.object({
  name: zod_1.z
    .string()
    .trim()
    .min(2, 'Name is required and must contain at least 2 characters')
    .max(100, 'Name cannot exceed 100 characters')
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
  nidScannedCopy: zod_1.z
    .string()
    .nonempty({ message: 'NID Scanned copy is required.' })
    .url({ message: 'NID Scanned copy must be a valid URL.' })
    .optional(),
  birthCertificateNumber: zod_1.z
    .string()
    .trim()
    .regex(/^\d{17}$/, {
      message: 'Birth certificate number must be exactly 17 digits.',
    })
    .optional(),
  birthCertificateScannedCopy: zod_1.z
    .string()
    .url({ message: 'Birth certificate scanned copy must be a valid URL.' })
    .optional(),
});
const createWorkScheduleValidationSchema = zod_1.z.object({
  shiftType: zod_1.z.enum(['morning', 'evening', 'night']),
  startTime: zod_1.z
    .string()
    .regex(
      /^(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])$/,
      'Time slot must be in HH:mm 24-hour format',
    ),
  endTime: zod_1.z
    .string()
    .regex(
      /^(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])$/,
      'Time slot must be in HH:mm 24-hour format',
    ),
});
const updateWorkScheduleValidationSchema = zod_1.z.object({
  shiftType: zod_1.z.enum(['morning', 'evening', 'night']).optional(),
  startTime: zod_1.z
    .string()
    .regex(
      /^(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])$/,
      'Time slot must be in HH:mm 24-hour format',
    )
    .optional(),
  endTime: zod_1.z
    .string()
    .regex(
      /^(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])$/,
      'Time slot must be in HH:mm 24-hour format',
    )
    .optional(),
});
const createPayrollInformationValidationSchema = zod_1.z.object({
  monthlySalary: zod_1.z
    .number({ invalid_type_error: 'Monthly salary must be a numeric value.' })
    .positive({ message: 'Monthly salary must be a positive value.' })
    .min(1000, { message: 'Monthly salary must be at least 1000.' }),
  paymentMethod: zod_1.z.enum(['bankTransfer', 'cheque', 'cash']),
  bankName: zod_1.z.string().optional(),
  accountNumber: zod_1.z.string().optional(),
  branchCode: zod_1.z.string().optional(),
});
const updatePayrollInformationValidationSchema = zod_1.z.object({
  monthlySalary: zod_1.z
    .number({ invalid_type_error: 'Monthly salary must be a numeric value.' })
    .positive({ message: 'Monthly salary must be a positive value.' })
    .min(1000, { message: 'Monthly salary must be at least 1000.' })
    .optional(),
  paymentMethod: zod_1.z.enum(['bankTransfer', 'cheque', 'cash']).optional(),
  bankName: zod_1.z.string().optional(),
  accountNumber: zod_1.z.string().optional(),
  branchCode: zod_1.z.string().optional(),
});
const createEducationDetailsValidationSchema = zod_1.z.object({
  highestEducation: zod_1.z
    .string()
    .trim()
    .min(
      2,
      'Highest education is required and must contain at least 2 characters',
    )
    .max(100, 'Highest education cannot exceed 100 characters'),
  certificateScannedCopy: zod_1.z
    .string()
    .nonempty({ message: 'Certificate scanned copy is required.' })
    .url({ message: 'Certificate scanned copy must be a valid URL.' }),
  institution: zod_1.z
    .string()
    .trim()
    .min(2, 'Institution is required and must contain at least 2 characters')
    .max(150, 'Institution cannot exceed 150 characters'),
  yearOfGraduation: zod_1.z
    .string()
    .regex(/^\d{4}$/, {
      message: 'Year of graduation must be a 4-digit year.',
    }),
});
const updateEducationDetailsValidationSchema = zod_1.z.object({
  highestEducation: zod_1.z
    .string()
    .trim()
    .min(
      2,
      'Highest education is required and must contain at least 2 characters',
    )
    .max(150, 'Highest education cannot exceed 150 characters')
    .optional(),
  certificateScannedCopy: zod_1.z
    .string()
    .url({ message: 'Certificate scanned copy must be a valid URL.' })
    .optional(),
  institution: zod_1.z
    .string()
    .trim()
    .min(2, 'Institution is required and must contain at least 2 characters')
    .max(150, 'Institution cannot exceed 150 characters')
    .optional(),
  yearOfGraduation: zod_1.z
    .string()
    .regex(/^\d{4}$/, { message: 'Year of graduation must be a 4-digit year.' })
    .optional(),
});
const createExperienceValidationSchema = zod_1.z.object({
  previousCompany: zod_1.z
    .string()
    .trim()
    .min(
      2,
      'Previous company is required and must contain at least 2 characters',
    )
    .max(100, 'Previous company cannot exceed 100 characters'),
  previousJobTitle: zod_1.z
    .string()
    .trim()
    .min(
      2,
      'Previous job title is required and must contain at least 2 characters',
    )
    .max(100, 'Previous job title cannot exceed 100 characters'),
  totalYearsOfExperience: zod_1.z
    .number({
      invalid_type_error: 'Total years of experience must be a numeric value.',
    })
    .positive({
      message: 'Total years of experience must be a positive number.',
    })
    .max(50, { message: 'Total years of experience cannot exceed 50 years.' }),
  reasonForLeaving: zod_1.z
    .string()
    .trim()
    .min(
      5,
      'Reason for leaving is required and must contain at least 2 characters',
    )
    .max(500, 'Reason for leaving cannot exceed 100 characters'),
});
const updateExperienceValidationSchema = zod_1.z.object({
  previousCompany: zod_1.z
    .string()
    .trim()
    .min(
      2,
      'Previous company is required and must contain at least 2 characters',
    )
    .max(100, 'Previous company cannot exceed 100 characters')
    .optional(),
  previousJobTitle: zod_1.z
    .string()
    .trim()
    .min(
      2,
      'Previous job title is required and must contain at least 2 characters',
    )
    .max(100, 'Previous job title cannot exceed 100 characters')
    .optional(),
  totalYearsOfExperience: zod_1.z
    .number({
      invalid_type_error: 'Total years of experience must be a numeric value.',
    })
    .positive({
      message: 'Total years of experience must be a positive number.',
    })
    .max(50, { message: 'Total years of experience cannot exceed 50 years.' })
    .optional(),
  reasonForLeaving: zod_1.z
    .string()
    .trim()
    .min(
      5,
      'Reason for leaving is required and must contain at least 5 characters',
    )
    .max(500, 'Reason for leaving cannot exceed 500 characters')
    .optional(),
});
const createStaffValidationSchema = zod_1.z.object({
  body: zod_1.z.object({
    firstName: zod_1.z
      .string()
      .trim()
      .min(2, 'First name is required and must contain at least 2 characters')
      .max(50, 'First name cannot exceed 50 characters')
      .regex(
        /^[a-zA-Z\-'\s]+$/,
        'First name can only contain letters, spaces, hyphens, or apostrophes',
      ),
    lastName: zod_1.z
      .string()
      .trim()
      .min(2, 'Last name is required and must contain at least 2 characters')
      .max(50, 'Last name cannot exceed 50 characters')
      .regex(
        /^[a-zA-Z\-'\s]+$/,
        'Last name can only contain letters, spaces, hyphens, or apostrophes',
      ),
    gender: zod_1.z.enum(['male', 'female']),
    dateOfBirth: zod_1.z
      .string()
      .length(10)
      .regex(
        /^\d{4}-\d{2}-\d{2}$/,
        'Date of birth must be in YYYY-MM-DD format',
      ),
    bloodGroup: zod_1.z
      .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
      .optional(),
    profilePicture: zod_1.z
      .string()
      .max(500, 'Profile picture url can not exceed 500 characters')
      .optional(),
    contactInformation: createContactInformationValidationSchema,
    emergencyContact: createEmergencyContactValidationSchema,
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
    address: createAddressValidationSchema,
    nid: createNidValidationSchema.optional(),
    birthCertificate: createBirthCertificateValidationSchema,
    guardian: createGuardianValidationSchema,
    staffRole: zod_1.z.string(),
    employmentType: zod_1.z.enum(['fullTime', 'partTime', 'contractual']),
    employmentID: zod_1.z.string().optional(),
    dateOfJoining: zod_1.z
      .string()
      .length(10)
      .regex(
        /^\d{4}-\d{2}-\d{2}$/,
        'Date of joining must be in YYYY-MM-DD format',
      ),
    workSchedule: createWorkScheduleValidationSchema,
    payrollInformation: createPayrollInformationValidationSchema,
    educationDetails: createEducationDetailsValidationSchema,
    experience: createExperienceValidationSchema.optional(),
    createdBy: zod_1.z.string().optional(),
    isDeleted: zod_1.z.boolean().default(false),
  }),
});
const updateStaffValidationSchema = zod_1.z.object({
  body: zod_1.z.object({
    firstName: zod_1.z
      .string()
      .trim()
      .min(2, 'First name is required and must contain at least 2 characters')
      .max(50, 'First name cannot exceed 50 characters')
      .regex(
        /^[a-zA-Z\-'\s]+$/,
        'First name can only contain letters, spaces, hyphens, or apostrophes',
      )
      .optional(),
    lastName: zod_1.z
      .string()
      .trim()
      .min(2, 'Last name is required and must contain at least 2 characters')
      .max(50, 'Last name cannot exceed 50 characters')
      .regex(
        /^[a-zA-Z\-'\s]+$/,
        'Last name can only contain letters, spaces, hyphens, or apostrophes',
      )
      .optional(),
    gender: zod_1.z.enum(['male', 'female']).optional(),
    dateOfBirth: zod_1.z
      .string()
      .length(10)
      .regex(
        /^\d{4}-\d{2}-\d{2}$/,
        'Date of birth must be in YYYY-MM-DD format',
      )
      .optional(),
    bloodGroup: zod_1.z
      .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
      .optional(),
    profilePicture: zod_1.z
      .string()
      .max(500, 'Profile picture url can not exceed 500 characters')
      .optional(),
    contactInformation: updateContactInformationValidationSchema.optional(),
    emergencyContact: updateEmergencyContactValidationSchema.optional(),
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
    address: updateAddressValidationSchema.optional(),
    nid: updateNidValidationSchema.optional(),
    birthCertificate: updateBirthCertificateValidationSchema.optional(),
    guardian: updateGuardianValidationSchema.optional(),
    staffRole: zod_1.z.string().optional(),
    employmentType: zod_1.z
      .enum(['fullTime', 'partTime', 'contractual'])
      .optional(),
    employmentID: zod_1.z.string().optional(),
    dateOfJoining: zod_1.z
      .string()
      .length(10)
      .regex(
        /^\d{4}-\d{2}-\d{2}$/,
        'Date of joining must be in YYYY-MM-DD format',
      )
      .optional(),
    workSchedule: updateWorkScheduleValidationSchema.optional(),
    payrollInformation: updatePayrollInformationValidationSchema.optional(),
    educationDetails: updateEducationDetailsValidationSchema.optional(),
    experience: updateExperienceValidationSchema.optional(),
    createdBy: zod_1.z.string().optional(),
    isDeleted: zod_1.z.boolean().default(false),
  }),
});
exports.StaffValidationSchema = {
  createStaffValidationSchema,
  updateStaffValidationSchema,
};
