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
exports.SpecializationServices = void 0;
const HttpError_1 = require("../../errors/HttpError");
const specialization_model_1 = require("./specialization.model");
const createSpecialization = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // check if specialization name is already exists
    const existingSpecialization = yield specialization_model_1.Specialization.findOne({
        name: { $regex: new RegExp(`^${payload.name.trim()},"i`) },
    }).select("name").lean();
    if (existingSpecialization) {
        throw new HttpError_1.HttpError(400, `Specialization with the name '${payload.name}' already exists. Please choose a different name.`);
    }
    const createdSpecialization = yield specialization_model_1.Specialization.create(payload);
    return createdSpecialization;
});
const getAllSpecializations = () => __awaiter(void 0, void 0, void 0, function* () {
    const specializations = yield specialization_model_1.Specialization.find().populate({ path: "createdBy", select: "firstName lastName email" });
    if (specializations.length === 0) {
        throw new HttpError_1.HttpError(404, 'No specialization were found in the database');
    }
    return specializations;
});
const getSpecializationById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const specialization = yield specialization_model_1.Specialization.findById(id).populate({ path: "createdBy", select: "firstName lastName email" });
    ;
    if (!specialization) {
        throw new HttpError_1.HttpError(404, `No specialization found with ID: ${id}`);
    }
    return specialization;
});
const updateSpecializationById = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existingSpecialization = yield specialization_model_1.Specialization.findOne({
        _id: id,
        name: payload.name,
    });
    if (existingSpecialization) {
        throw new HttpError_1.HttpError(400, `Specialization with the name '${payload.name}' already exists. Please choose a different name.`);
    }
    const updatedSpecialization = yield specialization_model_1.Specialization.findOneAndUpdate({ _id: id, isDeleted: false }, payload, { new: true, runValidators: true });
    if (!updatedSpecialization) {
        throw new HttpError_1.HttpError(404, `No specialization found with ID: ${id}`);
    }
    return updatedSpecialization;
});
const deleteSpecializationById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedSpecialization = yield specialization_model_1.Specialization.findOneAndUpdate({ _id: id, isDeleted: false }, { isDeleted: true }, { new: true });
    if (!deletedSpecialization) {
        throw new HttpError_1.HttpError(404, `No specialization found with ID: ${id}`);
    }
    return deletedSpecialization;
});
exports.SpecializationServices = {
    createSpecialization,
    getAllSpecializations,
    getSpecializationById,
    updateSpecializationById,
    deleteSpecializationById,
};
