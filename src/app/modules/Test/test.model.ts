import { model, Schema } from "mongoose";
import { TTest } from "./test.interface";
import { excludeDeletedAggregation, excludeDeletedQuery } from "../../utils/queryFilters";

const testSchema = new Schema<TTest>({
    testName: {
        type: String,
        trim: true,
        required: true,
    },
    testDescription: {
        type: String,
        trim: true,
        required: true,
    },
    testCategory: {
        type: String,
        enum: {
            values: ["diagnostic", "clinical", "radiology", "pathology", "microbiology", "biochemistry", "hematology", "immunology", "genetics", "toxicology"],
            message: '{VALUE} is not a valid test category'
        },
        required: true,
    },
    price: {
        type: Number,
        trim: true,
        required: true,
    },
    duration: {
        type: String,
        trim: true,
        required: true,
    },
    testPreparation: {
        type: String,
        trim: true,
        required: true,
    },
    testMethodology: {
        type: String,
        trim: true,
        required: true,
    },
    roomNumber: {
        type: String,
        trim: true,
        required: true,
    },
    floorNumber: {
        type: String,
        trim: true,
        required: true,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
    },
    testAvailability: {
        type: Boolean,
        default: true,
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

// query middleware for soft delete by utils
testSchema.pre("find", excludeDeletedQuery)
testSchema.pre("findOne", excludeDeletedQuery)

// aggregate middleware for soft delete by utils
testSchema.pre("aggregate", excludeDeletedAggregation)

export const Test = model("Test", testSchema);