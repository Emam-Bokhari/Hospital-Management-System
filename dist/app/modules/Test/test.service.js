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
exports.TestServices = void 0;
const HttpError_1 = require("../../errors/HttpError");
const test_model_1 = require("./test.model");
const createTest = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // check if test name is already exists
    const existingTest = yield test_model_1.Test.findOne({
        testName: { $regex: new RegExp(`^${payload.testName.trim()}$`, 'i') },
    })
        .select('testName')
        .lean();
    if (existingTest) {
        throw new HttpError_1.HttpError(400, ` Test name with the name '${payload.testName}' already exists. Please choose a different name.`);
    }
    const createdTest = yield test_model_1.Test.create(payload);
    return createdTest;
});
const getAllTests = () => __awaiter(void 0, void 0, void 0, function* () {
    const tests = yield test_model_1.Test.find().populate({ path: "createdBy", select: "firstName lastName email" });
    if (tests.length === 0) {
        throw new HttpError_1.HttpError(404, 'No tests were found in the database');
    }
    return tests;
});
const getTestById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const test = yield test_model_1.Test.findById(id).populate({ path: "createdBy", select: "firstName lastName email" });
    if (!test) {
        throw new HttpError_1.HttpError(404, `No test found with ID:${id}`);
    }
    return test;
});
const updateTestById = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const test = yield test_model_1.Test.findOne({
        testName: { $regex: new RegExp(`^${payload.testName}$`, 'i') },
    })
        .select('testName')
        .lean();
    if (test) {
        throw new HttpError_1.HttpError(400, 'The test is already exist, Please choose deferent test name');
    }
    const updatedTest = yield test_model_1.Test.findOneAndUpdate({ _id: id, isDeleted: false }, payload, { new: true, runValidators: true });
    if (!updatedTest) {
        throw new HttpError_1.HttpError(404, `No test found with ID:${id}`);
    }
    return updatedTest;
});
const deleteTestById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedTest = yield test_model_1.Test.findOneAndUpdate({ _id: id, isDeleted: false }, { isDeleted: true }, { new: true });
    if (!deletedTest) {
        throw new HttpError_1.HttpError(404, `No test found with ID:${id}`);
    }
});
const updateTestAvailabilityById = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (payload.testAvailability === undefined) {
        throw new HttpError_1.HttpError(400, 'Test availability status is required');
    }
    const updatedTestAvailability = yield test_model_1.Test.findOneAndUpdate({ _id: id, isDeleted: false }, payload, { new: true, runValidators: true });
    if (!updatedTestAvailability) {
        throw new HttpError_1.HttpError(404, `No test found with ID:${id}`);
    }
    return updatedTestAvailability;
});
exports.TestServices = {
    createTest,
    getAllTests,
    getTestById,
    updateTestById,
    deleteTestById,
    updateTestAvailabilityById,
};
