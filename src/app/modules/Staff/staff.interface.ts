import { Types } from "mongoose";

export type TBloodGroup = "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";

export type TContactInformation = {
    phone: string;
    email: string;
}

export type TAddress = {
    permanent: string;
    current: string;
}

export type TEmergencyContact = {
    name: string;
    phone: string;
    relationship: string;
}

export type TNid = {
    number: number;
    scannedCopy: string;
}

export type TBirthCertificate = {
    number: number;
    scannedCopy: string;
}

export type TGuardian = {
    name: string;
    relationship: string;
    phone: string;
    email?: string;
    nidNumber: number;
    nidScannedCopy: string;
    birthCertificateNumber?: number;
    birthCertificateScannedCopy?: string;
}

export type TWorkSchedule = {
    shiftType: "morning" | "evening" | "night";
    startTime: string;
    endTime: string;
}

export type TPayrollInformation = {
    monthlySalary: number;
    paymentMethod: "bankTransfer" | "cheque" | "cash";
    bankName?: string;
    accountNumber?: string;
    branchCode?: string;
}

export type TEducationDetails = {
    highestEducation: string;
    certificateScannedCopy: string;
    institution: string;
    yearOfGraduation: string;
}

export type TExperience = {
    previousCompany: string;
    previousJobTitle: string;
    totalYearsOfExperience: number;
    reasonForLeaving: string;
}

export type TStaff = {
    firstName: string;
    lastName: string;
    gender: "male" | "female";
    dateOfBirth: string;
    bloodGroup?: TBloodGroup;
    profilePicture?: string;
    contactInformation: TContactInformation;
    emergencyContact: TEmergencyContact;
    nationality: string;
    religion: string;
    address: TAddress;
    nid?: TNid;
    birthCertificate: TBirthCertificate;
    guardian: TGuardian;
    staffRoles: Types.ObjectId;
    employmentType: "fullTime" | "partTime" | "contractual";
    employmentID?: string;
    dateOfJoining: string;
    workSchedule: TWorkSchedule;
    payrollInformation: TPayrollInformation;
    educationDetails: TEducationDetails;
    experience?: TExperience;
}



export type TStaffRoles = {
    name: string;
    createdBy: Types.ObjectId;
}