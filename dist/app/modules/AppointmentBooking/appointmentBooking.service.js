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
exports.AppointmentBookingServices = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const HttpError_1 = require('../../errors/HttpError');
const doctor_model_1 = require('../Doctor/doctor.model');
const appointmentBooking_model_1 = require('./appointmentBooking.model');
const appointmentBooking_utils_1 = require('./appointmentBooking.utils');
const createAppointmentBooking = (payload) =>
  __awaiter(void 0, void 0, void 0, function* () {
    // check if doctor is exist
    const doctor = yield doctor_model_1.Doctor.findOne({ _id: payload.doctor });
    if (!doctor) {
      throw new HttpError_1.HttpError(404, 'Doctor not found');
    }
    // check if appointment is within working hours
    const isWithinWorkingHours = (startTime, endTime, timeSlot) => {
      const startMinutes = (0, appointmentBooking_utils_1.convertTimeToMinutes)(
        startTime,
      );
      const endMinutes = (0, appointmentBooking_utils_1.convertTimeToMinutes)(
        endTime,
      );
      const slotMinutes = (0, appointmentBooking_utils_1.convertTimeToMinutes)(
        timeSlot,
      );
      return slotMinutes >= startMinutes && slotMinutes <= endMinutes;
    };
    // validate doctor working hours and the selected time slot
    const validateDoctorAvailability = (doctor, appointmentDay, timeSlot) => {
      // Check if doctor is available on the selected day
      if (!doctor.workingDays.includes(appointmentDay)) {
        throw new HttpError_1.HttpError(
          400,
          `Doctor is not available on ${appointmentDay}. Available days are: ${doctor.workingDays}`,
        );
      }
      // Ensure doctor has working hours
      if (!doctor.workingHours || doctor.workingHours.length === 0) {
        throw new HttpError_1.HttpError(
          400,
          'Doctor does not have working hours',
        );
      }
      // Loop through all working hours and check for any matching time slot
      let isAvailable = false;
      for (const workingHour of doctor.workingHours) {
        const { startTime, endTime } = workingHour;
        // Check if the selected time slot is within the working hours
        if (isWithinWorkingHours(startTime, endTime, timeSlot)) {
          isAvailable = true;
          break;
        }
      }
      if (!isAvailable) {
        throw new HttpError_1.HttpError(
          400,
          `Time slot ${timeSlot} is not within any of the doctor working hours`,
        );
      }
    };
    // get the appointment day
    const appointmentDay = (0, appointmentBooking_utils_1.convertDateToDay)(
      payload.appointmentDate,
    );
    // validate doctor availability for the appointment day and time slot
    validateDoctorAvailability(doctor, appointmentDay, payload.timeSlot);
    // check if existing appointment are the same time
    const existingAppointment =
      yield appointmentBooking_model_1.AppointmentBooking.findOne({
        doctor: doctor._id,
        appointmentDate: payload.appointmentDate,
        timeSlot: payload.timeSlot,
      });
    if (existingAppointment) {
      throw new HttpError_1.HttpError(
        400,
        'This time slot is already booked for the doctor',
      );
    }
    // TODO: check if payment is exist
    // generate and add  appointment booking ID
    const appointmentBookingId = yield (0,
    appointmentBooking_utils_1.generateAppointmentBookingId)();
    payload.id = appointmentBookingId;
    const createdAppointmentBooking =
      yield appointmentBooking_model_1.AppointmentBooking.create(payload);
    return createdAppointmentBooking;
  });
const getAllAppointmentBookings = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    const appointmentBookings =
      yield appointmentBooking_model_1.AppointmentBooking.find()
        .populate({ path: 'userId' })
        .populate({
          path: 'doctor',
          select: 'firstName lastName',
          populate: { path: 'specialization', select: 'name' },
        });
    if (appointmentBookings.length === 0) {
      throw new HttpError_1.HttpError(
        404,
        'No appointment bookings were found in the database',
      );
    }
    return appointmentBookings;
  });
const getAppointmentBookingById = (id) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const appointmentBooking =
      yield appointmentBooking_model_1.AppointmentBooking.findById(id)
        .populate({ path: 'userId' })
        .populate({
          path: 'doctor',
          select: 'firstName lastName',
          populate: { path: 'specialization', select: 'name' },
        });
    if (!appointmentBooking) {
      throw new HttpError_1.HttpError(
        404,
        `No appointment booking found with ID: ${id}`,
      );
    }
    return appointmentBooking;
  });
const updateAppointmentBookingStatusById = (id, status) =>
  __awaiter(void 0, void 0, void 0, function* () {
    // validating the status
    const validStatuses = ['pending', 'confirmed', 'completed', 'cancelled'];
    if (!validStatuses.includes(status)) {
      throw new HttpError_1.HttpError(400, `Invalid status: ${status}`);
    }
    // check if appointment booking is exist
    const appointmentBooking =
      yield appointmentBooking_model_1.AppointmentBooking.findById(id).select(
        '_id doctor',
      );
    if (!appointmentBooking) {
      throw new HttpError_1.HttpError(
        404,
        `Appointment booking with ID: ${id} not found`,
      );
    }
    // check if the doctor is authenticate
    // if (appointmentBooking.doctor.toString() !== userId) {
    //     throw new HttpError(403, "You are not authorized to update this appointment")
    // };
    // if the status is confirmed
    // if (status === "confirmed") {
    //     if (!appointmentBooking.payment) {
    //         throw new HttpError(400, "Payment ID is missing for this appointment")
    //     }
    //     // check the payment status
    //     const payment = await Payment.findById(appointmentBooking.payment);
    //     if (!payment) {
    //         throw new HttpError(404, "Payment not found")
    //     };
    //     if (payment.status !== "confirmed") {
    //         throw new HttpError(400, "Payment has not been confirmed.")
    //     }
    // }
    const updatedAppointmentBookingStatus =
      yield appointmentBooking_model_1.AppointmentBooking.findByIdAndUpdate(
        id,
        { status },
        { new: true },
      );
    return updatedAppointmentBookingStatus;
  });
exports.AppointmentBookingServices = {
  createAppointmentBooking,
  getAllAppointmentBookings,
  getAppointmentBookingById,
  updateAppointmentBookingStatusById,
};
