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
exports.DeathRecordServices = void 0;
const HttpError_1 = require('../../errors/HttpError');
const flattenAndUpdate_1 = require('../../utils/modelSpecific/flattenAndUpdate');
const doctor_model_1 = require('../Doctor/doctor.model');
const deathRecord_model_1 = require('./deathRecord.model');
const deathRecord_utils_1 = require('./deathRecord.utils');
const createDeathRecord = (payload) =>
  __awaiter(void 0, void 0, void 0, function* () {
    // check if doctor is exists
    const doctor = yield doctor_model_1.Doctor.findOne({ _id: payload.doctor });
    if (!doctor) {
      throw new HttpError_1.HttpError(404, 'No doctor found');
    }
    const deathCertificateNo = yield (0,
    deathRecord_utils_1.generateDeathCertificateNo)();
    payload.deathCertificateNo = deathCertificateNo;
    const createdDeathRecord =
      yield deathRecord_model_1.DeathRecord.create(payload);
    return createdDeathRecord;
  });
const getAllDeathRecords = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    const deathRecords = yield deathRecord_model_1.DeathRecord.find().populate({
      path: 'createdBy',
      select: 'firstName lastName email role',
    });
    if (deathRecords.length === 0) {
      throw new HttpError_1.HttpError(
        404,
        'No death record were found in the database',
      );
    }
    return deathRecords;
  });
const getDeathRecordById = (id) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const deathRecord = yield deathRecord_model_1.DeathRecord.findById(
      id,
    ).populate({
      path: 'createdBy',
      select: 'firstName lastName email role',
    });
    if (!deathRecord) {
      throw new HttpError_1.HttpError(
        404,
        `No death record found with ID: ${id}`,
      );
    }
    return deathRecord;
  });
const updateDeathRecordById = (id, payload) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { guardian, address } = payload,
      remainingBirthRecordData = __rest(payload, ['guardian', 'address']);
    const modifiedUpdatedData = Object.assign({}, remainingBirthRecordData);
    // utility function for update nested fields, update object fields
    if (guardian) {
      (0, flattenAndUpdate_1.flattenAndUpdate)(
        'guardian',
        guardian,
        modifiedUpdatedData,
      );
    }
    if (address) {
      (0, flattenAndUpdate_1.flattenAndUpdate)(
        'address',
        address,
        modifiedUpdatedData,
      );
    }
    const updatedDeathRecord =
      yield deathRecord_model_1.DeathRecord.findOneAndUpdate(
        { _id: id, isDeleted: false },
        modifiedUpdatedData,
        { new: true, runValidators: true },
      );
    if (!updatedDeathRecord) {
      throw new HttpError_1.HttpError(
        404,
        `No death record found with ID: ${id}`,
      );
    }
    return updatedDeathRecord;
  });
const deleteDeathRecordById = (id) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const deletedDeathRecord =
      yield deathRecord_model_1.DeathRecord.findOneAndUpdate(
        { _id: id, isDeleted: false },
        { isDeleted: true },
        { new: true },
      );
    if (!deletedDeathRecord) {
      throw new HttpError_1.HttpError(
        404,
        `No death record found with ID: ${id}`,
      );
    }
    return deletedDeathRecord;
  });
exports.DeathRecordServices = {
  createDeathRecord,
  getAllDeathRecords,
  getDeathRecordById,
  updateDeathRecordById,
  deleteDeathRecordById,
};
