import { model, Schema } from 'mongoose';
import {
  TAddress,
  TContactInformation,
  TTestBooking,
} from './testBooking.interface';

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

const testBookingSchema = new Schema<TTestBooking>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    id: {
      type: String,
      unique: true,
    },
    test: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Test',
    },
    payment: {
      type: Schema.Types.ObjectId,
      // ref:"Payment",
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
    medicalHistory: {
      type: [String],
    },
    symptoms: {
      type: [String],
    },
    status: {
      type: String,
      enum: {
        values: ['pending', 'confirmed', 'completed', 'cancelled'],
        message: '{VALUE} is not a valid status',
      },
      default: 'pending',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const TestBooking = model<TTestBooking>('TestBooking', testBookingSchema);
