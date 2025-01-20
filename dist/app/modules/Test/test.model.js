"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Test = void 0;
const mongoose_1 = require("mongoose");
const queryFilters_1 = require("../../utils/modelSpecific/queryFilters");
const testSchema = new mongoose_1.Schema({
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
            values: [
                'diagnostic',
                'clinical',
                'radiology',
                'pathology',
                'microbiology',
                'biochemistry',
                'hematology',
                'immunology',
                'genetics',
                'toxicology',
            ],
            message: '{VALUE} is not a valid test category',
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
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
    },
    testAvailability: {
        type: Boolean,
        default: true,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
    versionKey: false,
});
// query middleware for soft delete by utils
testSchema.pre('find', queryFilters_1.excludeDeletedQuery);
testSchema.pre('findOne', queryFilters_1.excludeDeletedQuery);
// aggregate middleware for soft delete by utils
testSchema.pre('aggregate', queryFilters_1.excludeDeletedAggregation);
exports.Test = (0, mongoose_1.model)('Test', testSchema);
