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
exports.BedServices = void 0;
const HttpError_1 = require('../../errors/HttpError');
const bed_model_1 = require('./bed.model');
const createBed = (payload) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const createdBed = yield bed_model_1.Bed.create(payload);
    return createdBed;
  });
const getAllBeds = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    const beds = yield bed_model_1.Bed.find().populate({
      path: 'createdBy',
      select: 'firstName lastName email role',
    });
    if (beds.length === 0) {
      throw new HttpError_1.HttpError(404, 'No bed were found in the database');
    }
    return beds;
  });
const getBedById = (id) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const bed = yield bed_model_1.Bed.findById(id).populate({
      path: 'createdBy',
      select: 'firstName lastName email role',
    });
    if (!bed) {
      throw new HttpError_1.HttpError(404, `No bed found with ID: ${id}`);
    }
    return bed;
  });
const updateBedById = (id, payload) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const bed = yield bed_model_1.Bed.findById(id);
    if (!bed) {
      throw new HttpError_1.HttpError(404, `No bed found with ID: ${id}`);
    }
    const { action, facilities } = payload,
      remainingBedData = __rest(payload, ['action', 'facilities']);
    const modifiedUpdatedData = Object.assign({}, remainingBedData);
    //  update array fields
    if (action && facilities) {
      if (action === 'add') {
        modifiedUpdatedData.$addToSet = { facilities: facilities };
      } else if (action === 'remove') {
        modifiedUpdatedData.$pull = { facilities: facilities };
      }
    }
    const updatedBed = yield bed_model_1.Bed.findOneAndUpdate(
      { _id: id, isDeleted: false },
      modifiedUpdatedData,
      { new: true, runValidators: true },
    );
    return updatedBed;
  });
const updateBedAvailabilityStatusById = (id, availabilityStatus) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const validateAvailabilityStatuses = [
      'available',
      'occupied',
      'maintenance',
    ];
    if (!validateAvailabilityStatuses.includes(availabilityStatus)) {
      throw new HttpError_1.HttpError(
        400,
        `Invalid status: ${availabilityStatus}`,
      );
    }
    const updatedBedAvailabilityStatus = yield bed_model_1.Bed.findOneAndUpdate(
      { _id: id, isDeleted: false },
      { availabilityStatus },
      { new: true, runValidators: true },
    );
    if (!updatedBedAvailabilityStatus) {
      throw new HttpError_1.HttpError(404, `No bed found with Id: ${id}`);
    }
    return updatedBedAvailabilityStatus;
  });
const deleteBedById = (id) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const deletedBed = yield bed_model_1.Bed.findOneAndUpdate(
      { _id: id, isDeleted: false },
      { isDeleted: true },
      { new: true },
    );
    if (!deletedBed) {
      throw new HttpError_1.HttpError(404, `No bed found with ID: ${id}`);
    }
    return deletedBed;
  });
exports.BedServices = {
  createBed,
  getAllBeds,
  getBedById,
  updateBedById,
  updateBedAvailabilityStatusById,
  deleteBedById,
};
