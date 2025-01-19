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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServices = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const mongoose_1 = __importDefault(require("mongoose"));
const HttpError_1 = require("../../errors/HttpError");
const doctor_model_1 = require("../Doctor/doctor.model");
const user_model_1 = require("./user.model");
const createUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const createdUser = yield user_model_1.User.create(payload);
    return createdUser;
});
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_model_1.User.find();
    if (users.length === 0) {
        throw new HttpError_1.HttpError(404, 'No users were found in the database');
    }
    return users;
});
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findById(id);
    if (!user) {
        throw new HttpError_1.HttpError(404, `No user found with ID: ${id}`);
    }
    return user;
});
const updateUserById = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedUser = yield user_model_1.User.findOneAndUpdate({ _id: id, isDeleted: false }, payload, {
        new: true,
        runValidators: true,
    });
    if (!updatedUser) {
        throw new HttpError_1.HttpError(404, `No user found with ID: ${id}`);
    }
    return updatedUser;
});
const deleteUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        // check if user exists
        const user = yield user_model_1.User.findById(id).session(session);
        // check if doctor exists
        const doctor = yield doctor_model_1.Doctor.findOne({ userId: id }).session(session);
        // if no user and no doctor throw error
        if (!user && !doctor) {
            throw new HttpError_1.HttpError(404, `No user or doctor found with ID:${id}`);
        }
        if (user && !user.isDeleted) {
            yield user_model_1.User.findByIdAndUpdate(id, { isDeleted: true }, { new: true, runValidators: true, session });
        }
        if (doctor && !doctor.isDeleted) {
            yield doctor_model_1.Doctor.findByIdAndUpdate(doctor._id, { isDeleted: true }, { new: true, runValidators: true, session });
        }
        yield session.commitTransaction();
        yield session.endSession();
        return { message: `Successfully deleted!` };
    }
    catch (err) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new HttpError_1.HttpError(500, err.message);
    }
});
exports.UserServices = {
    createUser,
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById,
};
