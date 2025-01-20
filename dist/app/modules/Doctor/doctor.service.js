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
var __rest =
  (this && this.__rest) ||
  function (s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === 'function')
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]];
      }
    return t;
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.DoctorServices = void 0;
const HttpError_1 = require('../../errors/HttpError');
const flattenAndUpdate_1 = require('../../utils/modelSpecific/flattenAndUpdate');
const updateArrayField_1 = require('../../utils/modelSpecific/updateArrayField');
const department_model_1 = require('../Department/department.model');
const specialization_model_1 = require('../Specialization/specialization.model');
const doctor_model_1 = require('./doctor.model');
const createDoctor = (payload) =>
  __awaiter(void 0, void 0, void 0, function* () {
    // check if specialization  exists
    const specialization = yield specialization_model_1.Specialization.findOne({
      _id: payload.specialization,
    }).select('_id');
    if (!specialization) {
      throw new HttpError_1.HttpError(
        404,
        'No specialization found the provided ID',
      );
    }
    // Check if a department exists for the given specialization
    const department = yield department_model_1.Department.findOne({
      specialization: payload.specialization,
    });
    if (!department) {
      throw new HttpError_1.HttpError(
        404,
        'No department found for the given specialization.',
      );
    }
    payload.department = department._id;
    const createdDoctor = yield doctor_model_1.Doctor.create(payload);
    return createdDoctor;
  });
const getAllDoctors = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    const doctors = yield doctor_model_1.Doctor.find()
      .populate('userId')
      .populate({
        path: 'specialization',
        select: 'name',
        populate: { path: 'createdBy', select: 'firstName lastName email' },
      })
      .populate([
        {
          path: 'department',
          select: 'departmentName',
          populate: [
            {
              path: 'createdBy',
              select: 'firstName lastName email',
            },
            {
              path: 'specialization',
              select: 'name',
              populate: {
                path: 'createdBy',
                select: 'firstName lastName email',
              },
            },
          ],
        },
      ]);
    if (doctors.length === 0) {
      throw new HttpError_1.HttpError(
        404,
        'No doctor were found in the database',
      );
    }
    return doctors;
  });
const getDoctorById = (id) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const doctor = yield doctor_model_1.Doctor.findById(id)
      .populate('userId')
      .populate({
        path: 'specialization',
        select: 'name',
        populate: { path: 'createdBy', select: 'firstName lastName email' },
      })
      .populate([
        {
          path: 'department',
          select: 'departmentName',
          populate: [
            {
              path: 'createdBy',
              select: 'firstName lastName email',
            },
            {
              path: 'specialization',
              select: 'name',
              populate: {
                path: 'createdBy',
                select: 'firstName lastName email',
              },
            },
          ],
        },
      ]);
    if (!doctor) {
      throw new HttpError_1.HttpError(404, `No doctor found with ID: ${id}`);
    }
    return doctor;
  });
const updateDoctorById = (id, payload) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const {
        contactInformation,
        emergencyContact,
        medicalPracticeInformation,
        educationDetails,
        awards,
        previousWorkPlace,
        workingHours,
        qualifications,
        offDays,
        workingDays,
      } = payload,
      remainingDoctorData = __rest(payload, [
        'contactInformation',
        'emergencyContact',
        'medicalPracticeInformation',
        'educationDetails',
        'awards',
        'previousWorkPlace',
        'workingHours',
        'qualifications',
        'offDays',
        'workingDays',
      ]);
    const modifiedUpdatedData = Object.assign({}, remainingDoctorData);
    const doctor = yield doctor_model_1.Doctor.findById(id);
    if (!doctor) {
      throw new HttpError_1.HttpError(404, `No doctor found with ID: ${id}`);
    }
    // Utility function to flatten nested fields,  update object fields
    if (contactInformation) {
      (0, flattenAndUpdate_1.flattenAndUpdate)(
        'contactInformation',
        contactInformation,
        modifiedUpdatedData,
      );
    }
    if (emergencyContact) {
      (0, flattenAndUpdate_1.flattenAndUpdate)(
        'emergencyContact',
        emergencyContact,
        modifiedUpdatedData,
      );
    }
    if (medicalPracticeInformation) {
      (0, flattenAndUpdate_1.flattenAndUpdate)(
        'medicalPracticeInformation',
        medicalPracticeInformation,
        modifiedUpdatedData,
      );
    }
    // Utility function to flatten nested fields, update array of object fields
    if (educationDetails && educationDetails.length > 0) {
      (0, updateArrayField_1.updateArrayField)(
        'educationDetails',
        educationDetails,
        modifiedUpdatedData,
      );
    }
    if (awards && awards.length > 0) {
      (0, updateArrayField_1.updateArrayField)(
        'awards',
        awards,
        modifiedUpdatedData,
      );
    }
    if (previousWorkPlace && previousWorkPlace.length > 0) {
      (0, updateArrayField_1.updateArrayField)(
        'previousWorkPlace',
        previousWorkPlace,
        modifiedUpdatedData,
      );
    }
    if (workingHours && workingHours.length > 0) {
      (0, updateArrayField_1.updateArrayField)(
        'workingHours',
        workingHours,
        modifiedUpdatedData,
      );
    }
    //  update array fields
    if (qualifications) {
      const currentQualifications =
        (doctor === null || doctor === void 0
          ? void 0
          : doctor.qualifications) || [];
      if (qualifications.length > 0) {
        modifiedUpdatedData.qualifications = Array.from(
          new Set([...currentQualifications, ...qualifications]),
        );
      }
    }
    if (workingDays) {
      const currentWorkingDays =
        (doctor === null || doctor === void 0 ? void 0 : doctor.workingDays) ||
        [];
      if (workingDays.length > 0) {
        modifiedUpdatedData.workingDays = Array.from(
          new Set([...currentWorkingDays, ...workingDays]),
        );
      }
    }
    if (offDays) {
      const currentOffDays =
        (doctor === null || doctor === void 0 ? void 0 : doctor.offDays) || [];
      if (offDays.length > 0) {
        modifiedUpdatedData.offDays = Array.from(
          new Set([...currentOffDays, ...offDays]),
        );
      }
    }
    const updatedDoctor = yield doctor_model_1.Doctor.findOneAndUpdate(
      { _id: id, isDeleted: false },
      modifiedUpdatedData,
      { new: true, runValidators: true },
    );
    return updatedDoctor;
  });
exports.DoctorServices = {
  createDoctor,
  getAllDoctors,
  getDoctorById,
  updateDoctorById,
};
