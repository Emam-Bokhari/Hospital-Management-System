"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Expenses = void 0;
const mongoose_1 = require("mongoose");
const expensesSchema = new mongoose_1.Schema({
    expenseType: {
        type: String,
        enum: ["staffSalaries", "medicalSupplies", "diagnosticTools", "maintenance", "rent", "marketing", "utility", "government", "others"],
        required: true,
    },
    status: {
        type: String,
        enum: ["pending", "accept", "inProgress", "rejected"],
        default: "pending",
    },
    createdBy: {
        type: mongoose_1.Types.ObjectId,
        ref: "User",
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    staff: {
        staffId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Staff" },
        bonusAmount: Number,
        month: String,
        deductions: Number,
        totalPayable: Number,
    },
    medicalSupplies: {
        itemName: String,
        quantity: Number,
        unitPrice: Number,
        supplier: String,
        purchaseDate: String,
        expiryDate: String,
        totalCost: Number,
    },
    diagnosticTools: {
        toolName: String,
        brand: String,
        quantity: Number,
        supplier: String,
        purchaseDate: String,
        warrantyPeriod: String,
        totalCost: Number,
    },
    maintenance: {
        maintenanceType: String,
        description: String,
        cost: Number,
        vendor: String,
        maintenanceDate: String,
    },
    rent: {
        rentedFor: {
            type: String,
            enum: ["hospitalBuilding", "medicalEquipment", "officeSpace"],
        },
        landlordName: String,
        monthlyRent: Number,
        paymentDate: String,
    },
    marketing: {
        campaignType: {
            type: String,
            enum: ["online", "print", "tv", "papers", "onSite", "others"],
        },
        description: String,
        cost: String,
    },
    utility: {
        utilityType: {
            type: String,
            enum: ["electricity", "water", "gas", "internet", "telephone", "transportation", "others"],
        },
        billingMonth: String,
        billAmount: Number,
        dueDate: String,
    },
    government: {
        feeType: {
            type: String,
            enum: ["environmental", "healthDepartment", "tax", "licenseRenewal"],
        },
        amount: Number,
        paymentDate: String,
        validUntil: String,
    },
    others: {
        description: String,
        cost: Number,
        additionalDetails: String,
    },
}, {
    timestamps: true,
    versionKey: false
});
exports.Expenses = (0, mongoose_1.model)("Expenses", expensesSchema);
