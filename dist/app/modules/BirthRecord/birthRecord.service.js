"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BirthRecordServices = void 0;
const HttpError_1 = require("../../errors/HttpError");
const flattenAndUpdate_1 = require("../../utils/modelSpecific/flattenAndUpdate");
const doctor_model_1 = require("../Doctor/doctor.model");
const birthRecord_model_1 = require("./birthRecord.model");
const createBirthRecord = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const createdBirthRecord = yield birthRecord_model_1.BirthRecord.create(payload);
    // check if doctor is exists
    const doctor = yield doctor_model_1.Doctor.findOne({ _id: payload.doctor })
        .select('_id')
        .lean();
    if (!doctor) {
        throw new HttpError_1.HttpError(404, 'Doctor not found');
    }
    return createdBirthRecord;
});
const getAllBirthRecords = () => __awaiter(void 0, void 0, void 0, function* () {
    const birthRecords = yield birthRecord_model_1.BirthRecord.find().populate({
        path: 'createdBy',
        select: 'firstName lastName email role',
    });
    if (birthRecords.length === 0) {
        throw new HttpError_1.HttpError(404, "No birth record were found in the database'");
    }
    return birthRecords;
});
const getBirthRecordById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const birthRecord = yield birthRecord_model_1.BirthRecord.findById(id).populate({
        path: 'createdBy',
        select: 'firstName lastName email role',
    });
    if (!birthRecord) {
        throw new HttpError_1.HttpError(404, `No department found with ID: ${id}`);
    }
    return birthRecord;
});
const updateBirthRecordById = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { guardian, address } = payload, remainingBirthRecordData = __rest(payload, ["guardian", "address"]);
    const modifiedUpdatedData = Object.assign({}, remainingBirthRecordData);
    // utility function for update nested fields, update object fields
    if (guardian) {
        (0, flattenAndUpdate_1.flattenAndUpdate)('guardian', guardian, modifiedUpdatedData);
    }
    if (address) {
        (0, flattenAndUpdate_1.flattenAndUpdate)('address', address, modifiedUpdatedData);
    }
    const updatedBirthRecord = yield birthRecord_model_1.BirthRecord.findOneAndUpdate({ _id: id, isDeleted: false }, modifiedUpdatedData, { new: true, runValidators: true });
    if (!updatedBirthRecord) {
        throw new HttpError_1.HttpError(404, `No birth record found with ID: ${id}`);
    }
    return updatedBirthRecord;
});
const deleteBirthRecordById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedBirthRecord = yield birthRecord_model_1.BirthRecord.findOneAndUpdate({ _id: id, isDeleted: false }, { isDeleted: true }, { new: true });
    if (!deletedBirthRecord) {
        throw new HttpError_1.HttpError(404, `No birth record found with ID: ${id}`);
    }
    return deletedBirthRecord;
});
exports.BirthRecordServices = {
    createBirthRecord,
    getAllBirthRecords,
    getBirthRecordById,
    updateBirthRecordById,
    deleteBirthRecordById,
};
