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
exports.DepartmentServices = void 0;
const HttpError_1 = require('../../errors/HttpError');
const updateArrayField_1 = require('../../utils/modelSpecific/updateArrayField');
const specialization_model_1 = require('../Specialization/specialization.model');
const department_model_1 = require('./department.model');
const createDepartment = (payload) =>
  __awaiter(void 0, void 0, void 0, function* () {
    // check if specialization is exist
    const specialization = yield specialization_model_1.Specialization.findOne({
      _id: payload.specialization,
    }).select('_id');
    if (!specialization) {
      throw new HttpError_1.HttpError(
        404,
        'No specialization found the provided ID',
      );
    }
    // check if department is already exist the same specialization
    const existingDepartment = yield department_model_1.Department.findOne({
      specialization: payload.specialization,
    });
    if (existingDepartment) {
      throw new HttpError_1.HttpError(
        400,
        'A department with the same specialization already exists.',
      );
    }
    const createdDepartment =
      yield department_model_1.Department.create(payload);
    return createdDepartment;
  });
const getAllDepartments = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    const departments = yield department_model_1.Department.find()
      .populate({
        path: 'specialization',
        select: 'name',
        populate: { path: 'createdBy', select: 'firstName lastName email' },
      })
      .populate({ path: 'createdBy', select: 'firstName lastName email' });
    if (departments.length === 0) {
      throw new HttpError_1.HttpError(
        404,
        'No department were found in the database',
      );
    }
    return departments;
  });
const getDepartmentById = (id) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const department = yield department_model_1.Department.findById(id)
      .populate({
        path: 'specialization',
        select: 'name',
        populate: { path: 'createdBy', select: 'firstName lastName email' },
      })
      .populate({ path: 'createdBy', select: 'firstName lastName email' });
    if (!department) {
      throw new HttpError_1.HttpError(
        404,
        `No department found with ID: ${id}`,
      );
    }
    return department;
  });
const updateDepartmentById = (id, payload) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const department = yield department_model_1.Department.findById(id);
    if (!department) {
      throw new HttpError_1.HttpError(
        404,
        `No department found with ID: ${id}`,
      );
    }
    const { symptomsAddressed, possibleCauses } = payload,
      remainingDepartmentData = __rest(payload, [
        'symptomsAddressed',
        'possibleCauses',
      ]);
    const modifiedUpdatedData = Object.assign({}, remainingDepartmentData);
    // Utility function to flatten nested fields, update array of object fields
    if (symptomsAddressed && symptomsAddressed.length > 0) {
      (0, updateArrayField_1.updateArrayField)(
        'symptomsAddressed',
        symptomsAddressed,
        modifiedUpdatedData,
      );
    }
    if (possibleCauses && possibleCauses.length > 0) {
      (0, updateArrayField_1.updateArrayField)(
        'possibleCauses',
        possibleCauses,
        modifiedUpdatedData,
      );
    }
    const updateDepartment =
      yield department_model_1.Department.findOneAndUpdate(
        { _id: id, isDeleted: false },
        modifiedUpdatedData,
        { new: true, runValidators: true },
      );
    return updateDepartment;
  });
const deleteDepartmentById = (id) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const deletedDepartment =
      yield department_model_1.Department.findOneAndUpdate(
        { _id: id, isDeleted: false },
        { isDeleted: true },
        { new: true },
      );
    if (!deletedDepartment) {
      throw new HttpError_1.HttpError(
        404,
        `No department found with ID: ${id}`,
      );
    }
    return deletedDepartment;
  });
exports.DepartmentServices = {
  createDepartment,
  getAllDepartments,
  getDepartmentById,
  updateDepartmentById,
  deleteDepartmentById,
};
