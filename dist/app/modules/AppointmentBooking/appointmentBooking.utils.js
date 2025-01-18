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
exports.generateAppointmentBookingId =
  exports.convertDateToDay =
  exports.convertTimeToMinutes =
    void 0;
const generateDynamicId_1 = require('../../utils/generateDynamicId');
const appointmentBooking_model_1 = require('./appointmentBooking.model');
const convertTimeToMinutes = (time) => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};
exports.convertTimeToMinutes = convertTimeToMinutes;
const convertDateToDay = (appointmentDate) => {
  const appointmentDay = new Date(appointmentDate).toLocaleString('en-US', {
    weekday: 'long',
  });
  return appointmentDay;
};
exports.convertDateToDay = convertDateToDay;
// generate appointment booking id
const generateAppointmentBookingId = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    const appointmentBookingId = yield (0,
    generateDynamicId_1.generateDynamicId)(
      appointmentBooking_model_1.AppointmentBooking,
      'APP',
    );
    return appointmentBookingId;
  });
exports.generateAppointmentBookingId = generateAppointmentBookingId;
