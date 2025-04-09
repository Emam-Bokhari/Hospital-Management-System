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
exports.DepartmentServices = void 0;
const HttpError_1 = require('../../errors/HttpError');
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
        populate: {
          path: 'createdBy',
          select: 'firstName lastName email role',
        },
      })
      .populate({ path: 'createdBy', select: 'firstName lastName email role' });
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
        populate: {
          path: 'createdBy',
          select: 'firstName lastName email role',
        },
      })
      .populate({ path: 'createdBy', select: 'firstName lastName email role' });
    if (!department) {
      throw new HttpError_1.HttpError(
        404,
        `No department found with ID: ${id}`,
      );
    }
    return department;
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
  deleteDepartmentById,
};
