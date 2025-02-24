import { model, Schema } from 'mongoose';
import {
  TAddress,
  TAdmissionBooking,
  TContactInformation,
  TGuardian,
} from './admissionBooking.interface';

const addressSchema = new Schema<TAddress>({
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

const guardianSchema = new Schema<TGuardian>({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  relationship: {
    type: String,
    trim: true,
    required: true,
  },
  phone: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
  },
  nidNumber: {
    type: String,
    trim: true,
  },
  nidScannedCopy: {
    type: String,
    trim: true,
  },
});

const admissionBookingSchema = new Schema<TAdmissionBooking>({
  id: {
    type: String,
  },
  userId: {
    type: String,
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
    required: true,
  },
  bloodGroup: {
    type: String,
    enum: {
      values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
      message: '{VALUE} is not a valid blood group',
    },
  },
  weight: {
    type: Number,
    trim: true,
  },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female'],
      message: '{VALUE} is not a valid gender',
    },
    required: true,
  },
  contactInformation: {
    type: contactInformationSchema,
    required: true,
  },
  guardian: {
    type: guardianSchema,
    required: true,
  },
  address: {
    type: addressSchema,
    required: true,
  },
  bed: {
    type: Schema.Types.ObjectId,
    ref: 'Bed',
    required: true,
  },
  admissionDate: {
    type: Date,
    required: true,
  },
  dischargeDate: {
    type: Date,
    required: true,
  },
  reasonForAdmission: {
    type: String,
    trim: true,
    required: true,
  },
  medicalHistory: {
    type: [String],
  },
  status: {
    type: String,
    enum: {
      values: ['pending', 'admitted', 'discharged', 'cancelled'],
      message: '{VALUE} is not a valid status',
    },
    default: 'pending',
  },
});

export const AdmissionBooking = model<TAdmissionBooking>(
  'AdmissionBooking',
  admissionBookingSchema,
);
