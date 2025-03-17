import { Types } from "mongoose";

export type TExpenses = {
    expenseType: "staffSalaries" | "medicalSupplies" | "diagnosticTools" | "maintenance" | "rent" | "marketing" | "utility" | "government" | "others";
    status: "pending" | "accept" | "inProgress" | "rejected";
    createdBy?: Types.ObjectId;
    isDeleted?: boolean;

    // staff
    staff?: {
        staffId: Types.ObjectId;
        bonusAmount?: number;
        month: string;
        deductions?: number;
        totalPayable?: number;
    }

    // medical supplies
    medicalSupplies?: {
        itemName: string;
        quantity: number;
        unitPrice: number;
        supplier: string;
        purchaseDate: string;
        expiryDate?: string;
        totalCost?: number;
    }

    // diagnostic tools
    diagnosticTools?: {
        toolName: string;
        brand?: string;
        quantity: number;
        supplier: string;
        purchaseDate: string;
        warrantyPeriod?: string; // e.g., '2 years'
        totalCost?: number;
    }

    // maintenance
    maintenance?: {
        maintenanceType: string;
        description: string;
        const: number;
        vendor?: string;
        maintenanceDate: string;
    }

    // rent
    rent?: {
        rentedFor: "hospitalBuilding" | "medicalEquipment" | "officeSpace";
        landlordName: string;
        monthlyRent: number;
        paymentDate: string;
    }

    // marketing
    marketing?: {
        campaignType: "online" | "print" | "tv" | "papers" | "onSite" | "others";
        description: string;
        cost: string;
    }

    // utility
    utility?: {
        utilityType: "electricity" | "water" | "gas" | "internet" | "telephone" | "transportation" | "others";
        billingMonth: string;
        billAmount: number;
        dueDate: string;
    }

    // government
    government?: {
        feeType: "environmental" | "healthDepartment" | "tax" | "licenseRenewal";
        amount: number;
        paymentDate: string;
        validUntil?: string;
    }

    // others
    others?: {
        description: string;
        cost: number;
        additionalDetails?: string;
    }
}