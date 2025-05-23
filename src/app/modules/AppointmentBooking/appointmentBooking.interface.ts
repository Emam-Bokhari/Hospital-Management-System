import { Types } from 'mongoose';

export type TAddress = {
  division: string;
  district: string;
  subDistrict: string;
};

export type TContactInformation = {
  phone: string;
  email?: string;
};

export type TBloodGroup =
  | 'A+'
  | 'A-'
  | 'B+'
  | 'B-'
  | 'AB+'
  | 'AB-'
  | 'O+'
  | 'O-';

export type TDays =
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday'
  | 'Sunday';

export type TStatus = ['pending', 'confirmed', 'completed', 'cancelled'];

export type TAppointmentBooking = {
  userId?: Types.ObjectId;
  id?: string;
  firstName: string;
  lastName: string;
  age: number;
  weight?: number;
  bloodGroup?: TBloodGroup;
  gender: 'male' | 'female';
  address: TAddress;
  contactInformation: TContactInformation;
  doctor: Types.ObjectId;
  appointmentDate: Date;
  timeSlot: string;
  status?: TStatus;
  prescriptionFiles?: string[];
  testReportFiles?: string[];
  additionalNotes?: string;
  payment?: Types.ObjectId;
};
