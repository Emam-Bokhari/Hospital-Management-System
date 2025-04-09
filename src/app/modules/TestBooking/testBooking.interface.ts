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

export type TTestBooking = {
  userId?: Types.ObjectId;
  id?: string;
  test: Types.ObjectId;
  payment?: Types.ObjectId;
  firstName: string;
  lastName: string;
  age: number;
  weight?: number;
  gender: 'male' | 'female';
  contactInformation: TContactInformation;
  address: TAddress;
  medicalHistory?: string[];
  symptoms?: string[];
  status?: ['pending', 'confirmed', 'completed', 'cancelled'];
};
