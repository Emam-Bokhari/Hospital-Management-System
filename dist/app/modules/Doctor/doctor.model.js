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
exports.Doctor = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const mongoose_1 = require("mongoose");
const doctor_utils_1 = require("./doctor.utils");
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
        trim: true,
    },
    relationship: {
        type: String,
        trim: true,
        required: true,
    },
});
const previousWorkPlaceSchema = new mongoose_1.Schema({
    companyName: {
        type: String,
        trim: true,
        required: true,
    },
    position: {
        type: String,
        trim: true,
        required: true,
    },
    startDate: {
        type: Date,
        validate: {
            validator: function (value) {
                return value instanceof Date;
            },
            message: (props) => `${props.value} is not a valid date!`,
        },
        required: true,
    },
    endDate: {
        type: Date,
        validate: {
            validator: function (value) {
                return value instanceof Date;
            },
            message: (props) => `${props.value} is not a valid date!`,
        },
        required: true,
    },
});
const educationDetailsSchema = new mongoose_1.Schema({
    universityName: {
        type: String,
        trim: true,
        required: true,
    },
    degreeEarned: {
        type: String,
        trim: true,
        required: true,
    },
    duration: {
        type: String,
        trim: true,
        required: true,
    },
    universityLocation: {
        type: String,
        trim: true,
        required: true,
    },
    universityWebsite: {
        type: String,
        validate: {
            validator: function (value) {
                return /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(value);
            },
            message: (props) => `${props.value} is not a valid URL!`,
        },
        trim: true,
    },
});
const awardsSchema = new mongoose_1.Schema({
    awardName: {
        type: String,
        trim: true,
        required: true,
    },
    awardCategory: {
        type: String,
        trim: true,
    },
    awardYear: {
        type: String,
        validate: {
            validator: function (value) {
                return /^\d{4}$/.test(value); // Validating year (YYYY format)
            },
            message: (props) => `${props.value} is not a valid year!`,
        },
        required: true,
    },
    awardDescription: {
        type: String,
        trim: true,
        required: true,
    },
    issuingOrganization: {
        type: String,
        trim: true,
    },
});
const medicalPracticeInformationSchema = new mongoose_1.Schema({
    hospitalAffiliation: {
        type: String,
        trim: true,
        required: true,
    },
    chamberAddress: {
        type: String,
        trim: true,
        required: true,
    },
});
const doctorSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        unique: true,
    },
    specialization: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'Specialization',
    },
    department: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Department',
    },
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
    nationality: {
        type: String,
        required: true,
    },
    religion: {
        type: String,
        required: true,
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
    educationDetails: {
        type: [educationDetailsSchema],
        required: true,
    },
    qualifications: [
        {
            type: String,
            trim: true,
            required: true,
        },
    ],
    licenseNumber: {
        type: String,
        trim: true,
        required: true,
    },
    previousWorkPlace: {
        type: [previousWorkPlaceSchema],
        required: true,
    },
    yearsOfExperience: {
        type: Number,
        trim: true,
    },
    medicalPracticeInformation: {
        type: medicalPracticeInformationSchema,
        required: true,
    },
    awards: {
        type: [awardsSchema],
        required: true,
    },
    workingDays: {
        type: [String],
        enum: [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday',
        ],
        required: true,
    },
    workingHours: [
        {
            startTime: {
                type: String,
                required: true,
            },
            endTime: {
                type: String,
                required: true,
            },
        },
    ],
    offDays: {
        type: [String],
        enum: [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday',
        ],
        required: true,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
    versionKey: false, // disables the '__v' field
});
// query middleware for soft delete by utils
doctorSchema.pre('find', queryFilters_1.excludeDeletedQuery);
doctorSchema.pre('findOne', queryFilters_1.excludeDeletedQuery);
// aggregate middleware for soft delete by utils
doctorSchema.pre('aggregate', queryFilters_1.excludeDeletedAggregation);
// check previous work place if start date before end date
previousWorkPlaceSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            (0, doctor_utils_1.validateDateRange)(this.startDate, this.endDate, 'The previous work place start date cannot be later than the end date.');
            next();
        }
        catch (err) {
            next(err);
        }
    });
});
// check working hours & available time slots if start time before end time
doctorSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // validate working hours
            this.workingHours.forEach((workingHour) => {
                (0, validateTimeRange_1.validateTimeRange)(workingHour.startTime, workingHour.endTime, 'Start time cannot be later than end time in working hours. ');
            });
            next();
        }
        catch (err) {
            next(err);
        }
    });
});
// check if working days and off days overlapping
doctorSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            (0, doctor_utils_1.validateOffDays)(this.workingDays, this.offDays, 'Off days cannot overlap with working days, Change your days');
            next();
        }
        catch (err) {
            next(err);
        }
    });
});
exports.Doctor = (0, mongoose_1.model)('Doctor', doctorSchema);
