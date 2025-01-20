"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateTimeRange = void 0;
const HttpError_1 = require("../../errors/HttpError");
const validateTimeRange = (startTime, endTime, errorMessage) => {
    const start = new Date(`1970-01-01T${startTime}:00`);
    const end = new Date(`1970-01-01T${endTime}:00`);
    if (start >= end) {
        throw new HttpError_1.HttpError(400, errorMessage);
    }
};
exports.validateTimeRange = validateTimeRange;
