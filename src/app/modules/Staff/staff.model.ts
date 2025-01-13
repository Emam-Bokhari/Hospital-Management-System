import { model, Schema } from "mongoose";
import { TAddress, TBirthCertificate, TContactInformation, TEducationDetails, TEmergencyContact, TExperience, TGuardian, TNid, TPayrollInformation, TStaff, TStaffRole, TWorkSchedule } from "./staff.interface";


const contactInformationSchema = new Schema<TContactInformation>({
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

const emergencyContactSchema = new Schema<TEmergencyContact>({
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

const addressSchema = new Schema<TAddress>({
    permanent: {
        type: String,
        trim: true,
        required: true,
    },
    current: {
        type: String,
        trim: true,
        required: true,
    }
})

const nidSchema = new Schema<TNid>({
    number: {
        type: Number,
        trim: true,
    },
    scannedCopy: {
        type: String,
        trim: true,
    }
})

const birthCertificateSchema = new Schema<TBirthCertificate>({
    number: {
        type: Number,
        trim: true,
        required: true,
    },
    scannedCopy: {
        type: String,
        trim: true,
        required: true,
    }
})

const guardianSchema = new Schema<TGuardian>({
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
    }
})

const workScheduleSchema = new Schema<TWorkSchedule>({
    shiftType: {
        type: String,
        enum: {
            values: ["morning", "evening", "night"],
            message: '{VALUE} is not a valid shift type'
        }
    },
    startTime: {
        type: String,
        required: true,
    },
    endTime: {
        type: String,
        required: true,
    }
})

const payrollInformationSchema = new Schema<TPayrollInformation>({
    monthlySalary: {
        type: Number,
        trim: true,
        required: true,
    },
    paymentMethod: {
        type: String,
        enum: {
            values: ["bankTransfer", "cheque", "cash"],
            message: '{VALUE} is not a valid payment method'
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
    }

})

const educationDetailsSchema = new Schema<TEducationDetails>({
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
    }
})

const experienceSchema = new Schema<TExperience>({
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
    }
})

const staffSchema = new Schema<TStaff>({
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
        enum: ["male", "female"],
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
            values: ["A+, A-, B+,B- ,AB+,AB-,O+,O-"],
            message: '{VALUE} is not a valid blood group'
        }
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
        type: nidSchema
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
        type: Schema.Types.ObjectId,
        ref: "StaffRole",
        required: true,
    },
    employmentType: {
        type: String,
        enum: {
            values: ["fullTime", "partTime", "contractual"],
            message: '{VALUE} is not a valid employment type'
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
        type: experienceSchema
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    isDeleted: {
        type: Boolean,
        default: false,
    }
},
    {
        timestamps: true,
        versionKey: false,
    }
)


const staffRoleSchema = new Schema<TStaffRole>({
    name: {
        type: String,
        trim: true,
        required: true,
        unique: true,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    isDeleted: {
        type: Boolean,
        default: false,
    }
},
    {
        timestamps: true,
        versionKey: false
    }
)


export const Staff = model<TStaff>("Staff", staffSchema)

export const StaffRole = model("StaffRole", staffRoleSchema)

