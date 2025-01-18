'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.validateOffDays =
  exports.validateTimeRange =
  exports.validateDateRange =
    void 0;
const HttpError_1 = require('../../errors/HttpError');
const validateDateRange = (startDate, endDate, errorMessage) => {
  if (startDate && endDate && startDate > endDate) {
    throw new HttpError_1.HttpError(400, errorMessage);
  }
};
exports.validateDateRange = validateDateRange;
const validateTimeRange = (startTime, endTime, errorMessage) => {
  const start = new Date(`1970-01-01T${startTime}:00`);
  const end = new Date(`1970-01-01T${endTime}:00`);
  if (start >= end) {
    throw new HttpError_1.HttpError(400, errorMessage);
  }
};
exports.validateTimeRange = validateTimeRange;
const validateOffDays = (workingDays, offDays, errorMessage) => {
  const overlappingDays = workingDays.filter((day) => offDays.includes(day));
  if (overlappingDays.length > 0) {
    throw new HttpError_1.HttpError(400, errorMessage);
  }
};
exports.validateOffDays = validateOffDays;
