import { Types } from "mongoose";

export type TBed = {
    bedType: "men" | "women" | "general" | "child" | "private";
    price: number;
    availabilityStatus: "available" | "occupied" | "maintenance";
    facilities: string[];
    description: string;
    admissionNotes?: string;
    createdBy?: Types.ObjectId;
    isDeleted?: boolean;
}