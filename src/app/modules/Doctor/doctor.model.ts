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
import { validateDateRange, validateOffDays, validateTimeRange } from './doctor.utils';

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
    required: true,
    unique: true,
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
    unique: true,
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
},
);

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
      unique: true,
    },
    department: {
      type: Schema.Types.ObjectId,
      ref: 'Department',
      unique: true,
    },
    firstName: {
      type: String,
      trim: true,
      required: true,
    },
    lastName: {
      type: String,
      trim: true,
      required: true,
    },
    gender: {
      type: String,
      enum: ['male', 'female'],
      required: true,
    },
    dateOfBirth: {
      type: String,
      validate: {
        validator: function (value) {
          return /^\d{4}-\d{2}-\d{2}$/.test(value); // YYYY-MM-DD format
        },
        message: (props) => `${props.value} is not a valid date format!`,
      },
      required: true,
    },
    nationality: {
      type: String,
      required: true,
    },
    religion: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
    },
    contactInformation: contactInformationSchema,
    emergencyContact: emergencyContactSchema,
    educationDetails: [educationDetailsSchema],
    qualifications: [
      {
        type: String,
        trim: true,
        required: true,
      },
    ],
    licenseNumber: {
      type: String,
      trim: true,
      required: true,
    },
    previousWorkPlace: [previousWorkPlaceSchema],
    yearsOfExperience: {
      type: Number,
      trim: true,
    },
    medicalPracticeInformation: medicalPracticeInformationSchema,
    awards: [awardsSchema],
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
      required: true,
    },
    workingHours: [
      {
        startTime: {
          type: String,
          required: true,
        },
        endTime: {
          type: String,
          required: true,
        },
      },
    ],
    availableTimeSlots: [
      {
        startTime: {
          type: String,
          required: true,
        },
        endTime: {
          type: String,
          required: true,
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
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    }
  },
  {
    timestamps: true,
    versionKey: false, // disables the '__v' field
  },
);

// query middleware
doctorSchema.pre('find', async function (next) {
  this.where({ isDeleted: false });
  next();
});

doctorSchema.pre('findOne', async function (next) {
  this.where({ isDeleted: false });
  next();
});

// aggregate middleware
doctorSchema.pre('aggregate', async function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

doctorSchema.pre('aggregate', async function (next) {
  this.pipeline().unshift({ $project: { isDeleted: 0 } });
  next();
});

// check previous work place if start date before end date
previousWorkPlaceSchema.pre("save", async function (next) {
  try {
    validateDateRange(this.startDate, this.endDate, "The previous work place start date cannot be later than the end date.")
    next()
  } catch (err: any) {
    this.invalidate("endDate", err.message)
    next(err)
  }
})

// check working hours & available time slots if start time before end time
doctorSchema.pre("save", async function (next) {
  try {
    // validate working hours
    this.workingHours.forEach((workingHour) => {
      validateTimeRange(workingHour.startTime, workingHour.endTime, "Start time cannot be later than end time in working hours. ")
    })

    // validate available time slots
    this.availableTimeSlots.forEach((availableTimeSlot) => {
      validateTimeRange(availableTimeSlot.startTime, availableTimeSlot.endTime, "Start time cannot be later than end time in available time slots.")
    })

    next()

  } catch (err: any) {
    this.invalidate("workingDays", err.message)
    this.invalidate("availableTimeSlots", err.message)
    next(err)
  }
})

// check if working days and off days overlapping
doctorSchema.pre("save", async function (next) {
  try {
    validateOffDays(this.workingDays, this.offDays, "Off days cannot overlap with working days, Change your days")
    next()
  } catch (err: any) {
    this.invalidate("offDays", err.message)
    next(err);
  }
})


export const Doctor = model<TDoctor>('Doctor', doctorSchema);
