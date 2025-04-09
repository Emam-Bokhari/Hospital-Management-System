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
exports.DoctorControllers = void 0;
const asyncHandler_1 = require('../../utils/global/asyncHandler');
const sendResponse_1 = require('../../utils/global/sendResponse');
const doctor_service_1 = require('./doctor.service');
const createDoctorController = (0, asyncHandler_1.asyncHandler)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const doctorPayload = req.body;
    const createdDoctor =
      yield doctor_service_1.DoctorServices.createDoctor(doctorPayload);
    (0, sendResponse_1.sendResponse)(res, {
      success: true,
      message: 'Doctor created successfully',
      statusCode: 201,
      data: createdDoctor,
    });
  }),
);
const getAllDoctorsController = (0, asyncHandler_1.asyncHandler)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const doctors = yield doctor_service_1.DoctorServices.getAllDoctors();
    (0, sendResponse_1.sendResponse)(res, {
      success: true,
      message: 'Doctors retrieved successfully',
      statusCode: 200,
      data: doctors,
    });
  }),
);
const getDoctorController = (0, asyncHandler_1.asyncHandler)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const doctor = yield doctor_service_1.DoctorServices.getDoctorById(id);
    (0, sendResponse_1.sendResponse)(res, {
      success: true,
      message: 'Doctor retrieved successfully',
      statusCode: 200,
      data: doctor,
    });
  }),
);
const updateDoctorController = (0, asyncHandler_1.asyncHandler)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const updatedPayload = req.body;
    const updatedDoctor =
      yield doctor_service_1.DoctorServices.updateDoctorById(
        id,
        updatedPayload,
      );
    (0, sendResponse_1.sendResponse)(res, {
      success: true,
      message: 'Doctor updated successfully',
      statusCode: 200,
      data: updatedDoctor,
    });
  }),
);
exports.DoctorControllers = {
  createDoctorController,
  getAllDoctorsController,
  getDoctorController,
  updateDoctorController,
};
