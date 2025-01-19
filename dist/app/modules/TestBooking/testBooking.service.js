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
exports.TestBookingServices = void 0;
const HttpError_1 = require("../../errors/HttpError");
const test_model_1 = require("../Test/test.model");
const testBooking_model_1 = require("./testBooking.model");
const testBooking_utils_1 = require("./testBooking.utils");
const createTestBooking = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const test = yield test_model_1.Test.findOne({ _id: payload.test });
    if (!test) {
        throw new HttpError_1.HttpError(404, 'The requested test does not exist.');
    }
    if (!(test === null || test === void 0 ? void 0 : test.testAvailability)) {
        throw new HttpError_1.HttpError(400, 'The requested test is currently unavailable. Please choose a different test or try again later.');
    }
    // TODO: automatic set userId
    // generate test booking id
    const testBookingId = yield (0, testBooking_utils_1.generateTestBookingId)();
    payload.id = testBookingId;
    // TODO: payment related validation
    const createdTestBooking = yield testBooking_model_1.TestBooking.create(payload);
    return createdTestBooking;
});
const getAllTestBookings = () => __awaiter(void 0, void 0, void 0, function* () {
    const testBookings = yield testBooking_model_1.TestBooking.find()
        .populate('userId')
        .populate({ path: 'test', populate: { path: 'createdBy' } });
    if (testBookings.length === 0) {
        throw new HttpError_1.HttpError(404, 'No test bookings were found in the database');
    }
    return testBookings;
});
const getTestBookingById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const testBooking = yield testBooking_model_1.TestBooking.findById(id)
        .populate('userId')
        .populate({ path: 'test', populate: { path: 'createdBy' } });
    if (!testBooking) {
        throw new HttpError_1.HttpError(404, `No test booking found with ID: ${id}`);
    }
    return testBooking;
});
const updateTestBookingStatusById = (id, status) => __awaiter(void 0, void 0, void 0, function* () {
    const validStatuses = ['pending', 'confirmed', 'completed', 'cancelled'];
    if (!validStatuses.includes(status)) {
        throw new HttpError_1.HttpError(400, `Invalid status: ${status}`);
    }
    // TODO: payment related validation and set status confirmed
    const updatedTestBookingStatus = yield testBooking_model_1.TestBooking.findOneAndUpdate({ _id: id }, { status }, { new: true, runValidators: true });
    if (!updatedTestBookingStatus) {
        throw new HttpError_1.HttpError(404, `Test booking with ID: ${id} not found`);
    }
    return updatedTestBookingStatus;
});
exports.TestBookingServices = {
    createTestBooking,
    getAllTestBookings,
    getTestBookingById,
    updateTestBookingStatusById,
};
