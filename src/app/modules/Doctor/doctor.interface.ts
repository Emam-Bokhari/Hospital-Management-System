import { Types } from 'mongoose';

export type TContactInformation = {
  phone: string;
  email: string;
};

export type TEmergencyContact = {
  name: string;
  phone: string;
  email?: string;
  relationship: string;
};

export type TPreviousWorkPlace = {
  companyName: string;
  position: string;
  startDate: Date;
  endDate: Date;
};

export type TEducationDetails = {
  universityName: string;
  degreeEarned: string;
  duration: string;
  specializationInEducation: string;
  universityLocation: string;
  universityWebsite?: string;
};

export type TAwards = {
  awardName: string;
  awardCategory?: string;
  awardYear: string;
  awardDescription: string;
  issuingOrganization?: string;
};

export type TMedicalPracticeInformation = {
  hospitalAffiliation: string;
  chamberAddress: string;
};

export type TDoctor = {
  userId: Types.ObjectId;
  firstName: string;
  lastName: string;
  gender: 'male' | 'female';
  dateOfBirth: string;
  nationality: string;
  religion: string;
  profilePicture?: string;
  contactInformation: TContactInformation; // done
  emergencyContact: TEmergencyContact; // done
  educationDetails: TEducationDetails[];
  specialization: string;
  qualifications: string[];
  licenseNumber: string;
  licenseExpiryDate: string;
  previousWorkPlace?: TPreviousWorkPlace[];
  yearsOfExperience?: number;
  medicalPracticeInformation: TMedicalPracticeInformation; // done
  awards?: TAwards[];
  workingDays: [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];
  workingHours: { startTime: string; endTime: string }[];
  availableTimeSlots: { startTime: string; endTime: string }[];
  offDays: [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];
  isDeleted: boolean;
};
