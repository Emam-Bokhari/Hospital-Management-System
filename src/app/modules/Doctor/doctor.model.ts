/* eslint-disable @typescript-eslint/no-explicit-any */
import { model, Schema } from 'mongoose';
import {
  TAwards,
  TContactInformation,
  TDoctor,
  TEducationDetails,
  TEmergencyContact,
  TMedicalPracticeInformation,
  TPreviousWorkPlace,
} from './doctor.interface';
import { validateDateRange, validateOffDays } from './doctor.utils';
import {
  excludeDeletedAggregation,
  excludeDeletedQuery,
} from '../../utils/modelSpecific/queryFilters';
import { validateTimeRange } from '../../utils/modelSpecific/validateTimeRange';

const contactInformationSchema = new Schema<TContactInformation>({
  phone: {
    type: String,
    trim: true,
    required: true,
    validate: {
      validator: function (value) {
        return /^\+\d{1,4}\d{7,15}$/.test(value);
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
  },
  email: {
    type: String,
    trim: true,
  },
});

const emergencyContactSchema = new Schema<TEmergencyContact>({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  phone: {
    type: String,
    trim: true,
    required: true,
    validate: {
      validator: function (value) {
        return /^\+\d{1,4}\d{7,15}$/.test(value);
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
  },
  email: {
    type: String,
    trim: true,
  },
  relationship: {
    type: String,
    trim: true,
    required: true,
  },
});

const previousWorkPlaceSchema = new Schema<TPreviousWorkPlace>({
  companyName: {
    type: String,
    trim: true,
    required: true,
  },
  position: {
    type: String,
    trim: true,
    required: true,
  },
  startDate: {
    type: Date,
    validate: {
      validator: function (value) {
        return value instanceof Date;
      },
      message: (props) => `${props.value} is not a valid date!`,
    },
    required: true,
  },
  endDate: {
    type: Date,
    validate: {
      validator: function (value) {
        return value instanceof Date;
      },
      message: (props) => `${props.value} is not a valid date!`,
    },
    required: true,
  },
});

const educationDetailsSchema = new Schema<TEducationDetails>({
  universityName: {
    type: String,
    trim: true,
    required: true,
  },
  degreeEarned: {
    type: String,
    trim: true,
    required: true,
  },
  duration: {
    type: String,
    trim: true,
    required: true,
  },
  universityLocation: {
    type: String,
    trim: true,
    required: true,
  },
  universityWebsite: {
    type: String,
    validate: {
      validator: function (value) {
        return /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(value);
      },
      message: (props) => `${props.value} is not a valid URL!`,
    },
    trim: true,
  },
});

const awardsSchema = new Schema<TAwards>({
  awardName: {
    type: String,
    trim: true,
    required: true,
  },
  awardCategory: {
    type: String,
    trim: true,
  },
  awardYear: {
    type: String,
    validate: {
      validator: function (value) {
        return /^\d{4}$/.test(value); // Validating year (YYYY format)
      },
      message: (props) => `${props.value} is not a valid year!`,
    },
    required: true,
  },
  awardDescription: {
    type: String,
    trim: true,
    required: true,
  },
  issuingOrganization: {
    type: String,
    trim: true,
  },
});

const medicalPracticeInformationSchema =
  new Schema<TMedicalPracticeInformation>({
    hospitalAffiliation: {
      type: String,
      trim: true,
      required: true,
    },
    chamberAddress: {
      type: String,
      trim: true,
      required: true,
    },
  });

const doctorSchema = new Schema<TDoctor>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      unique: true,
    },
    specialization: {
      type: Schema.Types.ObjectId,

      ref: 'Specialization',
    },
    department: {
      type: Schema.Types.ObjectId,
      ref: 'Department',
    },
    firstName: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    gender: {
      type: String,
      enum: ['male', 'female'],
    },
    dateOfBirth: {
      type: String,
      validate: {
        validator: function (value) {
          return /^\d{4}-\d{2}-\d{2}$/.test(value); // YYYY-MM-DD format
        },
        message: (props) => `${props.value} is not a valid date format!`,
      },
    },
    nationality: {
      type: String,
    },
    religion: {
      type: String,
    },
    profilePicture: {
      type: String,
    },
    contactInformation: {
      type: contactInformationSchema,
    },
    emergencyContact: {
      type: emergencyContactSchema,
    },
    educationDetails: {
      type: [educationDetailsSchema],
    },
    qualifications: [
      {
        type: String,
        trim: true,
      },
    ],
    licenseNumber: {
      type: String,
      trim: true,
    },
    previousWorkPlace: {
      type: [previousWorkPlaceSchema],
    },
    yearsOfExperience: {
      type: Number,
      trim: true,
    },
    medicalPracticeInformation: {
      type: medicalPracticeInformationSchema,
    },
    awards: {
      type: [awardsSchema],
    },
    workingDays: {
      type: [String],
      enum: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
    },
    workingHours: [
      {
        startTime: {
          type: String,
        },
        endTime: {
          type: String,
        },
      },
    ],
    offDays: {
      type: [String],
      enum: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false, // disables the '__v' field
  },
);

// query middleware for soft delete by utils
doctorSchema.pre('find', excludeDeletedQuery);
doctorSchema.pre('findOne', excludeDeletedQuery);

// aggregate middleware for soft delete by utils
doctorSchema.pre('aggregate', excludeDeletedAggregation);

// check previous work place if start date before end date
previousWorkPlaceSchema.pre('save', async function (next) {
  try {
    validateDateRange(
      this.startDate,
      this.endDate,
      'The previous work place start date cannot be later than the end date.',
    );
    next();
  } catch (err: any) {
    next(err);
  }
});

// check working hours & available time slots if start time before end time
doctorSchema.pre('save', async function (next) {
  try {
    if (this.workingHours && Array.isArray(this.workingHours)) {
      this.workingHours.forEach((workingHour) => {
        if (workingHour?.startTime && workingHour?.endTime) {
          validateTimeRange(
            workingHour.startTime,
            workingHour.endTime,
            'Start time cannot be later than end time in working hours.',
          );
        }
      });
    }
    next();
  } catch (err: any) {
    next(err);
  }
});

// check if working days and off days overlapping
doctorSchema.pre('save', async function (next) {
  try {
    if (this.workingDays && this.offDays) {
      validateOffDays(
        this.workingDays,
        this.offDays,
        'Off days cannot overlap with working days, Change your days',
      );
    }
    next();
  } catch (err: any) {
    next(err);
  }
});

export const Doctor = model<TDoctor>('Doctor', doctorSchema);
