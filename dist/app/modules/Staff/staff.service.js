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
exports.StaffServices = void 0;
const HttpError_1 = require("../../errors/HttpError");
const flattenAndUpdate_1 = require("../../utils/modelSpecific/flattenAndUpdate");
const staffRole_model_1 = require("../StaffRole/staffRole.model");
const staff_model_1 = require("./staff.model");
const createStaff = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // check if staff role is exists
    const staffRole = yield staffRole_model_1.StaffRole.findOne({ _id: payload.staffRole })
        .select('_id')
        .lean();
    if (!staffRole) {
        throw new HttpError_1.HttpError(404, 'No Staff role found the provided ID');
    }
    const createdStaff = yield staff_model_1.Staff.create(payload);
    return createdStaff;
});
const getAllStaffs = () => __awaiter(void 0, void 0, void 0, function* () {
    const staffs = yield staff_model_1.Staff.find()
        .populate([
        {
            path: 'staffRole', select: "name",
            populate: { path: "createdBy", select: "firstName lastName email" }
        }
    ])
        .populate({ path: 'createdBy', select: "firstName lastName email" });
    if (staffs.length === 0) {
        throw new HttpError_1.HttpError(404, 'No staffs were found in the database');
    }
    return staffs;
});
const getStaffById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const staff = yield staff_model_1.Staff.findById(id)
        .populate([
        {
            path: 'staffRole', select: "name",
            populate: { path: "createdBy", select: "firstName lastName email" }
        }
    ])
        .populate({ path: 'createdBy', select: "firstName lastName email" });
    if (!staff) {
        throw new HttpError_1.HttpError(404, `No staff  found with ID:${id}`);
    }
    return staff;
});
const updateStaffById = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { contactInformation, emergencyContact, birthCertificate, workSchedule, payrollInformation, educationDetails, experience } = payload, remainingStaffData = __rest(payload, ["contactInformation", "emergencyContact", "birthCertificate", "workSchedule", "payrollInformation", "educationDetails", "experience"]);
    const modifiedUpdatedData = Object.assign({}, remainingStaffData);
    // Utility function to flatten nested fields,  update object fields
    if (contactInformation) {
        (0, flattenAndUpdate_1.flattenAndUpdate)('contactInformation', contactInformation, modifiedUpdatedData);
    }
    if (emergencyContact) {
        (0, flattenAndUpdate_1.flattenAndUpdate)('emergencyContact', emergencyContact, modifiedUpdatedData);
    }
    if (birthCertificate) {
        (0, flattenAndUpdate_1.flattenAndUpdate)('birthCertificate', birthCertificate, modifiedUpdatedData);
    }
    if (workSchedule) {
        (0, flattenAndUpdate_1.flattenAndUpdate)('workSchedule', workSchedule, modifiedUpdatedData);
    }
    if (payrollInformation) {
        (0, flattenAndUpdate_1.flattenAndUpdate)('payrollInformation', payrollInformation, modifiedUpdatedData);
    }
    if (educationDetails) {
        (0, flattenAndUpdate_1.flattenAndUpdate)('educationDetails', educationDetails, modifiedUpdatedData);
    }
    if (experience) {
        (0, flattenAndUpdate_1.flattenAndUpdate)('experience', experience, modifiedUpdatedData);
    }
    const updatedStaff = yield staff_model_1.Staff.findOneAndUpdate({ _id: id, isDeleted: false }, modifiedUpdatedData, { new: true, runValidators: true });
    if (!updatedStaff) {
        throw new HttpError_1.HttpError(404, `No staff found with ID: ${id}`);
    }
    return updatedStaff;
});
const deleteStaffById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedStaff = yield staff_model_1.Staff.findOneAndUpdate({ _id: id, isDeleted: false }, { isDeleted: true }, { new: true });
    if (!deletedStaff) {
        throw new HttpError_1.HttpError(404, `No staff found with ID: ${id}`);
    }
    return deletedStaff;
});
exports.StaffServices = {
    createStaff,
    getAllStaffs,
    getStaffById,
    updateStaffById,
    deleteStaffById,
};
