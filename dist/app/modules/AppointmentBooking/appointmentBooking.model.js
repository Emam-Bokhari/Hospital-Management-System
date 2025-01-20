'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.AppointmentBooking = void 0;
const mongoose_1 = require('mongoose');
const addressSchema = new mongoose_1.Schema({
  division: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  subDistrict: {
    type: String,
    required: true,
  },
});
const contactInformationSchema = new mongoose_1.Schema({
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
const appointmentBookingSchema = new mongoose_1.Schema(
  {
    userId: {
      type: mongoose_1.Schema.Types.ObjectId,
      ref: 'User',
    },
    id: {
      type: String,
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
    age: {
      type: Number,
      trim: true,
      required: true,
    },
    weight: {
      type: Number,
      trim: true,
    },
    bloodGroup: {
      type: String,
      enum: {
        values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
        message: '{VALUE} is not a valid blood group',
      },
    },
    gender: {
      type: String,
      enum: {
        values: ['male', 'female'],
        message: '{VALUE} is not a va;od gender',
      },
    },
    address: {
      type: addressSchema,
      required: true,
    },
    contactInformation: {
      type: contactInformationSchema,
      required: true,
    },
    doctor: {
      type: mongoose_1.Schema.Types.ObjectId,
      required: true,
      ref: 'Doctor',
    },
    appointmentDate: {
      type: Date,
      required: true,
    },
    timeSlot: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: {
        values: ['pending', 'confirmed', 'completed', 'cancelled'],
        message: '{VALUE} is not a valid status',
      },
      default: 'pending',
    },
    prescriptionFiles: {
      type: [String],
      trim: true,
    },
    testReportFiles: {
      type: [String],
      trim: true,
    },
    additionalNotes: {
      type: String,
      trim: true,
    },
    payment: {
      type: mongoose_1.Schema.Types.ObjectId,
      // ref:"Payment"
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);
exports.AppointmentBooking = (0, mongoose_1.model)(
  'AppointmentBooking',
  appointmentBookingSchema,
);
