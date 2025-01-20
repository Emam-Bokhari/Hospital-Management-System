"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const queryFilters_1 = require("../../utils/modelSpecific/queryFilters");
const userSchema = new mongoose_1.Schema({
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
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        trim: true,
        required: true,
    },
    role: {
        type: mongoose_1.Schema.Types.String,
        enum: [
            'user',
            'doctor',
            'accounts-specialist',
            'finance-manager',
            'admin',
            'super-admin',
        ],
        default: 'user',
    },
    status: {
        type: mongoose_1.Schema.Types.String,
        enum: ['active', 'suspend'],
        default: 'active',
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
userSchema.pre('find', queryFilters_1.excludeDeletedQuery);
userSchema.pre('findOne', queryFilters_1.excludeDeletedQuery);
// aggregate middleware for soft delete by utils
userSchema.pre('aggregate', queryFilters_1.excludeDeletedAggregation);
exports.User = (0, mongoose_1.model)('User', userSchema);
