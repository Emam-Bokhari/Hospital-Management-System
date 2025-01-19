import { z } from 'zod';

const createTestValidationSchema = z.object({
  body: z.object({
    testName: z
      .string()
      .trim()
      .min(3, 'Test name must be contain at least 03 characters')
      .max(100, 'Test name can not exceed 100 characters')
      .nonempty('Test name is required.'),
    testDescription: z
      .string()
      .trim()
      .min(3, 'Test description must be contain at least 03 characters')
      .max(500, 'Test description can not exceed 500 characters')
      .nonempty('Test description is required.'),
    testCategory: z.enum([
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
    price: z
      .number()
      .positive('Price must be a positive number.')
      .min(1, 'Price must be at least 1.')
      .max(1000000, 'Price cannot exceed 1,000,000.'),
    duration: z
      .string()
      .regex(
        /^\d{1,3} (minutes?|hours?)$/,
        "Duration must be in the format 'X minutes' or 'X hours'.",
      )
      .nonempty('Duration is required.'),
    testPreparation: z
      .string()
      .max(500, 'Test preparation instructions cannot exceed 500 characters.')
      .nonempty('Test preparation is required.'),
    testMethodology: z
      .string()
      .max(1000, 'Test methodology cannot exceed 1000 characters.')
      .nonempty('Test methodology is required.'),
    roomNumber: z
      .string()
      .regex(
        /^\d{1,4}$/,
        'Room number must be a number between 1 and 4 digits.',
      )
      .nonempty('Room number is required.'),
    floorNumber: z
      .string()
      .regex(
        /^\d{1,2}$/,
        'Floor number must be a number between 1 and 2 digits.',
      )
      .nonempty('Floor number is required.'),
    createdBy: z.string().optional(),
    testAvailability: z.boolean().optional(),
    isDeleted: z.boolean().optional(),
  }),
});

const updateTestValidationSchema = z.object({
  body: z.object({
    testName: z
      .string()
      .trim()
      .min(3, 'Test name must be contain at least 03 characters')
      .max(100, 'Test name can not exceed 100 characters')
      .optional(),
    testDescription: z
      .string()
      .trim()
      .min(3, 'Test description must be contain at least 03 characters')
      .max(500, 'Test description can not exceed 500 characters')
      .optional(),
    testCategory: z
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
    price: z
      .number()
      .positive('Price must be a positive number.')
      .min(1, 'Price must be at least 1.')
      .max(1000000, 'Price cannot exceed 1,000,000.')
      .optional(),
    duration: z
      .string()
      .regex(
        /^\d{1,3} (minutes?|hours?)$/,
        "Duration must be in the format 'X minutes' or 'X hours'.",
      )
      .optional(),
    testPreparation: z
      .string()
      .max(500, 'Test preparation instructions cannot exceed 500 characters.')
      .optional(),
    testMethodology: z
      .string()
      .max(1000, 'Test methodology cannot exceed 1000 characters.')
      .optional(),
    roomNumber: z
      .string()
      .regex(
        /^\d{1,4}$/,
        'Room number must be a number between 1 and 4 digits.',
      )
      .optional(),
    floorNumber: z
      .string()
      .regex(
        /^\d{1,2}$/,
        'Floor number must be a number between 1 and 2 digits.',
      )
      .optional(),
    createdBy: z.string().optional(),
    testAvailability: z.boolean().optional(),
    isDeleted: z.boolean().optional(),
  }),
});

const testAvailabilityUpdateValidationSchema = z.object({
  body: z.object({
    testAvailability: z.boolean(),
  }),
});

export const TestValidationSchema = {
  createTestValidationSchema,
  updateTestValidationSchema,
  testAvailabilityUpdateValidationSchema,
};
