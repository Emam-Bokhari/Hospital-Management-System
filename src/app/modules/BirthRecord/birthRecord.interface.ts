import { Types } from "mongoose";

export type TGuardian = {
    name: string;
    relationship: string;
    phone: string;
    email?: string;
    nidNumber?: string;
    nidScannedCopy?: string;
}

export type TAddress = {
    division: string;
    district: string;
    subDistrict: string;
    village?: string;
    postalCode?: string;
}

export type TBirthRecord = {
    guardian: TGuardian;
    gender: "male" | "female";
    birthDate: Date;
    placeOfBirth: string;
    birthTime?: string;
    birthWeight: number;
    birthLength?: number;
    address: TAddress;
    nationality: string;
    religion: string;
    doctor: Types.ObjectId;
    createdBy?: Types.ObjectId;
    isDeleted?: boolean;
}