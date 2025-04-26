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
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaffRoleServices = void 0;
const HttpError_1 = require("../../errors/HttpError");
const staffRole_model_1 = require("./staffRole.model");
const createStaffRole = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // check if staff role name is already exists
    const existingStaffRole = yield staffRole_model_1.StaffRole.findOne({
        name: { $regex: new RegExp(`^${payload.name.trim()}$`, 'i') },
    });
    if (existingStaffRole) {
        throw new HttpError_1.HttpError(400, 'The staff role is already exist, Please choose different staff role name');
    }
    const createdStaffRole = yield staffRole_model_1.StaffRole.create(payload);
    return createdStaffRole;
});
const getAllStaffRoles = () => __awaiter(void 0, void 0, void 0, function* () {
    const staffRoles = yield staffRole_model_1.StaffRole.find().populate({
        path: 'createdBy',
        select: 'firstName lastName email role',
    });
    if (staffRoles.length === 0) {
        throw new HttpError_1.HttpError(404, 'No staff roles were found in the database');
    }
    return staffRoles;
});
const getStaffRoleById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const staff = yield staffRole_model_1.StaffRole.findById(id).populate({
        path: 'createdBy',
        select: 'firstName lastName email role',
    });
    if (!staff) {
        throw new HttpError_1.HttpError(404, `No staff role  found with ID:${id}`);
    }
    return staff;
});
const updateStaffRoleById = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedStaffRole = yield staffRole_model_1.StaffRole.findOneAndUpdate({ _id: id, isDeleted: false }, payload, { new: true, runValidators: true });
    if (!updatedStaffRole) {
        throw new HttpError_1.HttpError(404, `No staff role found with ID:${id}`);
    }
    return updatedStaffRole;
});
const deleteStaffRoleById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedStaffRole = yield staffRole_model_1.StaffRole.findOneAndUpdate({ _id: id, isDeleted: false }, { isDeleted: true }, { new: true });
    if (!deletedStaffRole) {
        throw new HttpError_1.HttpError(404, `No staff role found with ID:${id}`);
    }
});
exports.StaffRoleServices = {
    createStaffRole,
    getAllStaffRoles,
    getStaffRoleById,
    updateStaffRoleById,
    deleteStaffRoleById,
};
