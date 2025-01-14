import { Types } from "mongoose";

export type TTest = {
    testName: string;
    testDescription: string;
    testCategory: "diagnostic" | "clinical" | "radiology" | "pathology" | "microbiology" | "biochemistry" | "hematology" | "immunology" | "genetics" | "toxicology";
    price: number;
    duration: string;
    testPreparation: string;
    testMethodology: string;
    roomNumber: string;
    floorNumber: string;
    createdBy?: Types.ObjectId;
    testAvailability?: boolean;
    isDeleted?: boolean;
}