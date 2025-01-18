import { Types } from "mongoose"

type TContactInformation = {
    phone: string;
    email?: string;
}

type TAddress = {
    division: string;
    district: string;
    subDistrict: string;
}

export type TTestBooking = {
    userId?: Types.ObjectId;
    id?: string;
    test: Types.ObjectId;
    payment: Types.ObjectId;
    firstName: string;
    lastName: string;
    age: number;
    gender: ["male" | "female"];
    contactInformation: TContactInformation;
    address: TAddress;
    medicalHistory: string[];
    symptoms: string[];
}