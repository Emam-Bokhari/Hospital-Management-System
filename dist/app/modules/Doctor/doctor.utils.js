"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateOffDays = exports.validateDateRange = void 0;
const HttpError_1 = require("../../errors/HttpError");
const validateDateRange = (startDate, endDate, errorMessage) => {
    if (startDate && endDate && startDate > endDate) {
        throw new HttpError_1.HttpError(400, errorMessage);
    }
};
exports.validateDateRange = validateDateRange;
const validateOffDays = (workingDays, offDays, errorMessage) => {
    const overlappingDays = workingDays.filter((day) => offDays.includes(day));
    if (overlappingDays.length > 0) {
        throw new HttpError_1.HttpError(400, errorMessage);
    }
};
exports.validateOffDays = validateOffDays;
