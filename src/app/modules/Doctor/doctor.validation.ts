import { z } from 'zod';

const createContactInformationValidationSchema = z.object({
  phone: z
    .string()
    .trim()
    .regex(/^\+\d{1,4}\d{7,15}$/, { message: 'Invalid phone number format!' }),
  email: z
    .string()
    .email('Invalid email format')
    .max(100, 'Email cannot exceed 100 characters'),
});

const updateContactInformationValidationSchema = z.object({
  phone: z
    .string()
    .trim()
    .regex(/^\+\d{1,4}\d{7,15}$/, { message: 'Invalid phone number format!' })
    .optional(),
  email: z
    .string()
    .email('Invalid email format')
    .max(100, 'Email cannot exceed 100 characters')
    .optional(),
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
    )
    .optional(),
  phone: z
    .string()
    .trim()
    .regex(/^\+\d{1,4}\d{7,15}$/, { message: 'Invalid phone number format!' })
    .optional(),
  email: z
    .string()
    .email('Invalid email format')
    .max(100, 'Email cannot exceed 100 characters')
    .optional(),
  relationship: z
    .string()
    .trim()
    .min(3, 'Relationship is required and must contain at least 3 characters')
    .max(50, 'Relationship cannot exceed 50 characters')
    .optional(),
});

const createPreviousWorkPlaceValidationSchema = z.object({
  companyName: z
    .string()
    .trim()
    .min(3, 'Company name is required and must contain at least 3 characters')
    .max(100, 'Company name cannot exceed 100 characters'),
  position: z
    .string()
    .trim()
    .min(5, 'Position is required and must contain at least 5 characters')
    .max(100, 'Position cannot exceed 100 characters'),
  startDate: z.string(),
  endDate: z.string(),
});

const updatePreviousWorkPlaceValidationSchema = z.object({
  companyName: z
    .string()
    .trim()
    .min(3, 'Company name is required and must contain at least 3 characters')
    .max(100, 'Company name cannot exceed 100 characters')
    .optional(),
  position: z
    .string()
    .trim()
    .min(5, 'Position is required and must contain at least 5 characters')
    .max(100, 'Position cannot exceed 100 characters')
    .optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});

const createEducationalDetailsValidationSchema = z.object({
  universityName: z
    .string()
    .trim()
    .min(
      2,
      'University name is required and must contain at least 2 characters',
    )
    .max(100, 'University name cannot exceed 100 characters'),
  degreeEarned: z
    .string()
    .trim()
    .min(
      2,
      'Degree earned field is required and must contain at least 2 characters',
    )
    .max(50, 'Degree earned field cannot exceed 50 characters'),
  duration: z
    .string()
    .min(4, 'Duration is required and must contain at least 4 characters')
    .max(20, 'Duration cannot exceed 20 characters'),
  universityLocation: z
    .string()
    .min(
      3,
      'University location is required and must contain at least 3 characters',
    )
    .max(100, 'University location cannot exceed 100 characters'),
  universityWebsite: z
    .string()
    .max(200, 'University website url cannot exceed 200 characters')
    .optional(),
});

const updateEducationalDetailsValidationSchema = z.object({
  universityName: z
    .string()
    .trim()
    .min(
      2,
      'University name is required and must contain at least 2 characters',
    )
    .max(100, 'University name cannot exceed 100 characters')
    .optional(),
  degreeEarned: z
    .string()
    .trim()
    .min(
      2,
      'Degree earned field is required and must contain at least 2 characters',
    )
    .max(50, 'Degree earned field cannot exceed 50 characters')
    .optional(),
  duration: z
    .string()
    .min(4, 'Duration is required and must contain at least 4 characters')
    .max(20, 'Duration cannot exceed 20 characters')
    .optional(),
  universityLocation: z
    .string()
    .min(
      3,
      'University location is required and must contain at least 3 characters',
    )
    .max(100, 'University location cannot exceed 100 characters')
    .optional(),
  universityWebsite: z
    .string()
    .max(200, 'University website url cannot exceed 200 characters')
    .optional(),
});

const createAwardsValidationSchema = z.object({
  awardName: z
    .string()
    .trim()
    .min(3, 'Award name is required and must contain at least 3 characters')
    .max(100, 'Award name cannot exceed 100 characters'),
  awardCategory: z
    .string()
    .max(50, 'Award category cannot exceed 50 characters')
    .optional(),
  awardYear: z
    .string()
    .min(4, 'Award year is required')
    .max(4, 'Award year cannot exceed 4 characters'),
  awardDescription: z
    .string()
    .trim()
    .min(10, 'Award description is required')
    .max(500, 'Award description cannot exceed 500 characters'),
  issuingOrganization: z
    .string()
    .trim()
    .max(100, 'Award issuing organization cannot exceed 100 characters')
    .optional(),
});

const updateAwardsValidationSchema = z.object({
  awardName: z
    .string()
    .trim()
    .min(3, 'Award name is required and must contain at least 3 characters')
    .max(100, 'Award name cannot exceed 100 characters')
    .optional(),
  awardCategory: z
    .string()
    .max(50, 'Award category cannot exceed 50 characters')
    .optional(),
  awardYear: z
    .string()
    .min(4, 'Award year is required')
    .max(4, 'Award year cannot exceed 4 characters')
    .optional(),
  awardDescription: z
    .string()
    .trim()
    .min(10, 'Award description is required')
    .max(500, 'Award description cannot exceed 500 characters')
    .optional(),
  issuingOrganization: z
    .string()
    .trim()
    .max(100, 'Award issuing organization cannot exceed 100 characters')
    .optional(),
});

const createMedicalPracticeInformationValidationSchema = z.object({
  hospitalAffiliation: z
    .string()
    .trim()
    .min(
      3,
      'Hospital affiliation name is required and must contain at least 3 characters',
    )
    .max(100, 'Hospital affiliation cannot exceed 100 characters'),
  chamberAddress: z
    .string()
    .trim()
    .min(
      5,
      'Chamber address is required and must contain at least 5 characters',
    )
    .max(200, 'Chamber address cannot exceed 200 characters'),
});

const updateMedicalPracticeInformationValidationSchema = z.object({
  hospitalAffiliation: z
    .string()
    .trim()
    .min(
      3,
      'Hospital affiliation name is required and must contain at least 3 characters',
    )
    .max(100, 'Hospital affiliation cannot exceed 100 characters')
    .optional(),
  chamberAddress: z
    .string()
    .trim()
    .min(
      5,
      'Chamber address is required and must contain at least 5 characters',
    )
    .max(200, 'Chamber address cannot exceed 200 characters')
    .optional(),
});

const createDoctorValidationSchema = z.object({
  body: z.object({
    userId: z.string(),
    specialization: z.string(),
    department: z.string(),
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
    gender: z.enum(['male', 'female']),
    dateOfBirth: z
      .string()
      .length(10)
      .regex(
        /^\d{4}-\d{2}-\d{2}$/,
        'Date of birth must be in YYYY-MM-DD format',
      ),
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
    profilePicture: z
      .string()
      .max(500, 'Profile picture url can not exceed 500 characters')
      .optional(),
    contactInformation: createContactInformationValidationSchema,
    emergencyContact: createEmergencyContactValidationSchema,
    educationDetails: z.array(createEducationalDetailsValidationSchema),
    qualifications: z
      .array(z.string().min(2).max(100), {
        required_error: 'At least one qualification is required',
      })
      .nonempty('Qualifications cannot be empty.'),
    licenseNumber: z
      .string()
      .min(5, 'License number must have at least 5 characters'),
    licenseExpiryDate: z
      .string()
      .regex(
        /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/,
        'Invalid date format (YYYY-MM-DD)',
      )
      .refine(
        (value) => new Date(value) > new Date(),
        'License expiry date must be in the future',
      ),
    previousWorkPlace: z
      .array(createPreviousWorkPlaceValidationSchema)
      .optional(),
    yearsOfExperience: z.number().max(50).optional(),
    medicalPracticeInformation:
      createMedicalPracticeInformationValidationSchema,
    awards: z.array(createAwardsValidationSchema).optional(),
    workingDays: z
      .array(
        z.enum([
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ]),
      )
      .nonempty('At least one working day must be selected.'),
    workingHours: z
      .array(
        z.object({
          startTime: z.string(),
          endTime: z.string(),
        }),
      )
      .nonempty('Working hours must include at least one time range.'),
    availableTimeSlots: z.array(
      z.object({
        startTime: z.string(),
        endTime: z.string(),
      }),
    ),
    offDays: z
      .array(
        z.enum([
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ]),
      )
      .nonempty('At least one off day must be selected.'),
    isDeleted: z.boolean().default(false),
  }),
});

const updateDoctorValidationSchema = z.object({
  body: z.object({
    userId: z.string().optional(),
    specialization: z.string().optional(),
    department: z.string().optional(),
    firstName: z
      .string()
      .trim()
      .min(2, 'First name is required and must contain at least 2 characters')
      .max(50, 'First name cannot exceed 50 characters')
      .regex(
        /^[a-zA-Z\-'\s]+$/,
        'First name can only contain letters, spaces, hyphens, or apostrophes',
      )
      .optional(),
    lastName: z
      .string()
      .trim()
      .min(2, 'Last name is required and must contain at least 2 characters')
      .max(50, 'Last name cannot exceed 50 characters')
      .regex(
        /^[a-zA-Z\-'\s]+$/,
        'Last name can only contain letters, spaces, hyphens, or apostrophes',
      )
      .optional(),
    gender: z.enum(['male', 'female']).optional(),
    dateOfBirth: z
      .string()
      .length(10)
      .regex(
        /^\d{4}-\d{2}-\d{2}$/,
        'Date of birth must be in YYYY-MM-DD format',
      )
      .optional(),
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
    profilePicture: z
      .string()
      .max(500, 'Profile picture url can not exceed 500 characters')
      .optional(),
    contactInformation: updateContactInformationValidationSchema.optional(),
    emergencyContact: updateEmergencyContactValidationSchema.optional(),
    educationDetails: z
      .array(updateEducationalDetailsValidationSchema)
      .optional(),
    qualifications: z
      .array(z.string().min(2).max(100), {
        required_error: 'At least one qualification is required',
      })
      .optional(),
    licenseNumber: z
      .string()
      .min(5, 'License number must have at least 5 characters')
      .optional(),
    licenseExpiryDate: z
      .string()
      .regex(
        /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/,
        'Invalid date format (YYYY-MM-DD)',
      )
      .refine(
        (value) => new Date(value) > new Date(),
        'License expiry date must be in the future',
      )
      .optional(),
    previousWorkPlace: z
      .array(updatePreviousWorkPlaceValidationSchema)
      .optional(),
    yearsOfExperience: z.number().max(50).optional(),
    medicalPracticeInformation:
      updateMedicalPracticeInformationValidationSchema.optional(),
    awards: z.array(updateAwardsValidationSchema).optional(),
    workingDays: z
      .array(
        z.enum([
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ]),
      )
      .optional(),
    workingHours: z
      .array(
        z.object({
          startTime: z.string(),
          endTime: z.string(),
        }),
      )
      .optional(),
    availableTimeSlots: z
      .array(
        z.object({
          startTime: z.string(),
          endTime: z.string(),
        }),
      )
      .optional(),
    offDays: z
      .array(
        z.enum([
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ]),
      )
      .optional(),
    isDeleted: z.boolean().default(false),
  }),
});

export const DoctorValidationSchema = {
  createDoctorValidationSchema,
  updateDoctorValidationSchema,
};
