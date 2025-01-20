"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Staff = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const mongoose_1 = require("mongoose");
const queryFilters_1 = require("../../utils/modelSpecific/queryFilters");
const validateTimeRange_1 = require("../../utils/modelSpecific/validateTimeRange");
const contactInformationSchema = new mongoose_1.Schema({
    phone: {
        type: String,
        trim: true,
        required: true,
        validate: {
            validator: function (value) {
                return /^\+\d{1,4}\d{7,15}$/.test(value);
            },
            message: (props) => `${props.value} is not a valid phone number!`,
        },
    },
    email: {
        type: String,
        trim: true,
    },
});
const emergencyContactSchema = new mongoose_1.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    phone: {
        type: String,
        trim: true,
        required: true,
        validate: {
            validator: function (value) {
                return /^\+\d{1,4}\d{7,15}$/.test(value);
            },
            message: (props) => `${props.value} is not a valid phone number!`,
        },
    },
    email: {
        type: String,
    },
    relationship: {
        type: String,
        trim: true,
        required: true,
    },
});
const addressSchema = new mongoose_1.Schema({
    permanent: {
        type: String,
        trim: true,
        required: true,
    },
    current: {
        type: String,
        trim: true,
        required: true,
    },
});
const nidSchema = new mongoose_1.Schema({
    number: {
        type: Number,
        trim: true,
    },
    scannedCopy: {
        type: String,
        trim: true,
    },
});
const birthCertificateSchema = new mongoose_1.Schema({
    number: {
        type: Number,
        trim: true,
        required: true,
    },
    scannedCopy: {
        type: String,
        trim: true,
        required: true,
    },
});
const guardianSchema = new mongoose_1.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    relationship: {
        type: String,
        trim: true,
        required: true,
    },
    phone: {
        type: String,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        trim: true,
    },
    nidNumber: {
        type: Number,
        trim: true,
        required: true,
    },
    nidScannedCopy: {
        type: String,
        trim: true,
        required: true,
    },
    birthCertificateNumber: {
        type: Number,
        trim: true,
    },
    birthCertificateScannedCopy: {
        type: String,
        trim: true,
    },
});
const workScheduleSchema = new mongoose_1.Schema({
    shiftType: {
        type: String,
        enum: {
            values: ['morning', 'evening', 'night'],
            message: '{VALUE} is not a valid shift type',
        },
    },
    startTime: {
        type: String,
        required: true,
    },
    endTime: {
        type: String,
        required: true,
    },
});
const payrollInformationSchema = new mongoose_1.Schema({
    monthlySalary: {
        type: Number,
        trim: true,
        required: true,
    },
    paymentMethod: {
        type: String,
        enum: {
            values: ['bankTransfer', 'cheque', 'cash'],
            message: '{VALUE} is not a valid payment method',
        },
        required: true,
    },
    bankName: {
        type: String,
        trim: true,
    },
    accountNumber: {
        type: String,
        trim: true,
    },
    branchCode: {
        type: String,
        trim: true,
    },
});
const educationDetailsSchema = new mongoose_1.Schema({
    highestEducation: {
        type: String,
        trim: true,
        required: true,
    },
    certificateScannedCopy: {
        type: String,
        trim: true,
        required: true,
    },
    institution: {
        type: String,
        trim: true,
        required: true,
    },
    yearOfGraduation: {
        type: String,
        required: true,
    },
});
const experienceSchema = new mongoose_1.Schema({
    previousCompany: {
        type: String,
        trim: true,
        required: true,
    },
    previousJobTitle: {
        type: String,
        trim: true,
        required: true,
    },
    totalYearsOfExperience: {
        type: Number,
        trim: true,
        required: true,
    },
    reasonForLeaving: {
        type: String,
        trim: true,
        required: true,
    },
});
const staffSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        trim: true,
        required: true,
    },
    lastName: {
        type: String,
        trim: true,
        required: true,
    },
    gender: {
        type: String,
        enum: ['male', 'female'],
        required: true,
    },
    dateOfBirth: {
        type: String,
        validate: {
            validator: function (value) {
                return /^\d{4}-\d{2}-\d{2}$/.test(value); // YYYY-MM-DD format
            },
            message: (props) => `${props.value} is not a valid date format!`,
        },
        required: true,
    },
    bloodGroup: {
        type: String,
        enum: {
            values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
            message: '{VALUE} is not a valid blood group',
        },
    },
    profilePicture: {
        type: String,
    },
    contactInformation: {
        type: contactInformationSchema,
        required: true,
    },
    emergencyContact: {
        type: emergencyContactSchema,
        required: true,
    },
    nationality: {
        type: String,
        required: true,
    },
    religion: {
        type: String,
        required: true,
    },
    address: {
        type: addressSchema,
        required: true,
    },
    nid: {
        type: nidSchema,
    },
    birthCertificate: {
        type: birthCertificateSchema,
        required: true,
    },
    guardian: {
        type: guardianSchema,
        required: true,
    },
    staffRole: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'StaffRole',
    },
    employmentType: {
        type: String,
        enum: {
            values: ['fullTime', 'partTime', 'contractual'],
            message: '{VALUE} is not a valid employment type',
        },
        required: true,
    },
    employmentID: {
        type: String,
    },
    dateOfJoining: {
        type: String,
        required: true,
    },
    workSchedule: {
        type: workScheduleSchema,
        required: true,
    },
    payrollInformation: {
        type: payrollInformationSchema,
        required: true,
    },
    educationDetails: {
        type: educationDetailsSchema,
        required: true,
    },
    experience: {
        type: experienceSchema,
    },
    createdBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
    versionKey: false,
});
// check if start time before end time
staffSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            (0, validateTimeRange_1.validateTimeRange)(this.workSchedule.startTime, this.workSchedule.endTime, "Start time cannot be later than end time in working schedule");
        }
        catch (err) {
            next(err);
        }
    });
});
// query middleware for soft delete by utils
staffSchema.pre('find', queryFilters_1.excludeDeletedQuery);
staffSchema.pre('findOne', queryFilters_1.excludeDeletedQuery);
// aggregate middleware for soft delete by utils
staffSchema.pre('aggregate', queryFilters_1.excludeDeletedAggregation);
exports.Staff = (0, mongoose_1.model)('Staff', staffSchema);
