import { Types } from 'mongoose';

export type TContactInformation = {
  phone: string;
  email?: string;
};

export type TAddress = {
  division: string;
  district: string;
  subDistrict: string;
};

export type TStatus = ['pending', 'admitted', 'discharged', 'cancelled'];

export type TGuardian = {
  name: string;
  relationship: string;
  phone: string;
  email?: string;
  nidNumber?: string;
  nidScannedCopy?: string;
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

export type TAdmissionBooking = {
  id?: string;
  userId?: Types.ObjectId;
  firstName: string;
  lastName: string;
  age: number;
  weight?: number;
  bloodGroup?: TBloodGroup;
  gender: 'male' | 'female';
  contactInformation: TContactInformation;
  guardian: TGuardian;
  address: TAddress;
  bed: Types.ObjectId;
  admissionDate: Date;
  dischargeDate: Date;
  reasonForAdmission: string;
  medicalHistory?: string[];
  status?: TStatus;
};
