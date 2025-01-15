import { Types } from "mongoose"

export type TAddress = {
    division: string;
    district: string;
    subDistrict: string;
}

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

export type TAppointmentBooking = {
    userId?: Types.ObjectId;
    firstName: string;
    lastName: string;
    age: number;
    weight?: number;
    bloodGroup?: TBloodGroup;
    gender: "male" | "female";
    address: TAddress;
    contactInformation: TContactInformation;
    doctorId: Types.ObjectId;
    dateOfAppointment: Date;
    timeSlot: string;
    status?: ["pending", "confirmed", "completed", "cancelled"];
    prescriptionFiles?: string[];
    testReportFiles?: string[];
    additionalNotes?: string;
    paymentId: Types.ObjectId;
}