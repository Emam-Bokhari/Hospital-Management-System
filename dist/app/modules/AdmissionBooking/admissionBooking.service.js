'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.AdmissionBookingServices = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const HttpError_1 = require('../../errors/HttpError');
const bed_model_1 = require('../Bed/bed.model');
const admissionBooking_model_1 = require('./admissionBooking.model');
const admissionBooking_utils_1 = require('./admissionBooking.utils');
const createAdmissionBooking = (payload) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const bed = yield bed_model_1.Bed.findById(
      payload === null || payload === void 0 ? void 0 : payload.bed,
    );
    // check if bed is exists
    if (!bed) {
      throw new HttpError_1.HttpError(
        404,
        'The specified bed could not be found.',
      );
    }
    // check if bed is available
    if (
      bed.availabilityStatus &&
      ['occupied', 'maintenance'].includes(bed.availabilityStatus)
    ) {
      const statusMessage =
        bed.availabilityStatus === 'occupied'
          ? 'The selected bed is currently occupied.'
          : 'The selected bed is under maintenance.';
      throw new HttpError_1.HttpError(400, statusMessage);
    }
    // admission date
    payload.admissionDate = new Date();
    // number of day stayed
    let numberOfDayStayed = 1;
    const admissionTime = payload.admissionDate.getTime();
    const dischargeTime = new Date(payload.dischargeDate).getTime();
    numberOfDayStayed = Math.ceil(
      (dischargeTime - admissionTime) / (1000 * 60 * 60 * 24),
    );
    numberOfDayStayed = Math.max(1, numberOfDayStayed);
    const totalCost = bed.price * numberOfDayStayed;
    payload.totalCost = totalCost;
    // generate admission booking id
    const admissionBookingId = yield (0,
    admissionBooking_utils_1.generateAdmissionBookingId)();
    payload.id = admissionBookingId;
    const createdAdmissionBooking =
      yield admissionBooking_model_1.AdmissionBooking.create(payload);
    return createdAdmissionBooking;
  });
const getAllAdmissionBookings = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    const admissionBookings =
      yield admissionBooking_model_1.AdmissionBooking.find();
    if (admissionBookings.length === 0) {
      throw new HttpError_1.HttpError(
        404,
        'No admission booking were found in the database',
      );
    }
    return admissionBookings;
  });
const getAdmissionBookingById = (id) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const admissionBooking =
      yield admissionBooking_model_1.AdmissionBooking.findById(id);
    if (!admissionBooking) {
      throw new HttpError_1.HttpError(
        404,
        `No admission booking found with ID: ${id}`,
      );
    }
    return admissionBooking;
  });
const updateAdmissionBookingStatusById = (id, status) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const validStatuses = ['pending', 'admitted', 'discharged', 'cancelled'];
    if (!validStatuses.includes(status)) {
      throw new HttpError_1.HttpError(400, `Invalid status: ${status}`);
    }
    const updatedFields = { status };
    if (status === 'discharged') {
      const dischargeDate = new Date();
      // admission details and populate the bed field
      const admissionBooking =
        yield admissionBooking_model_1.AdmissionBooking.findById(id)
          .populate('bed')
          .lean();
      if (!admissionBooking) {
        throw new HttpError_1.HttpError(
          404,
          `Admission booking with ID: ${id} not found`,
        );
      }
      const admissionDate = new Date(admissionBooking.admissionDate);
      if (isNaN(admissionDate.getTime())) {
        throw new HttpError_1.HttpError(400, 'Invalid admission date');
      }
      const stayedDays = Math.ceil(
        (dischargeDate.getTime() - admissionDate.getTime()) /
          (1000 * 3600 * 24),
      );
      const bed = admissionBooking.bed;
      if (!bed || !bed.price) {
        throw new HttpError_1.HttpError(
          400,
          'Price not available for the assigned bed',
        );
      }
      // calculate the total cost based on stayedDays and bed price
      const totalCost = stayedDays * bed.price;
      updatedFields.dischargeDate = dischargeDate;
      updatedFields.totalCost = totalCost;
    }
    const updatedAdmissionBookingStatus =
      yield admissionBooking_model_1.AdmissionBooking.findOneAndUpdate(
        { _id: id },
        updatedFields,
        { new: true, runValidators: true },
      );
    if (!updatedAdmissionBookingStatus) {
      throw new HttpError_1.HttpError(
        404,
        `Admission booking with ID: ${id} not found`,
      );
    }
    return updatedAdmissionBookingStatus;
  });
exports.AdmissionBookingServices = {
  createAdmissionBooking,
  getAllAdmissionBookings,
  getAdmissionBookingById,
  updateAdmissionBookingStatusById,
};
