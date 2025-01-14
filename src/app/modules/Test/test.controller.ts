import { asyncHandler } from "../../utils/asyncHandler";
import { sendResponse } from "../../utils/sendResponse";
import { Test } from "./test.model";
import { TestServices } from "./test.service";

const createTestController = asyncHandler(async (req, res) => {
    const testPayload = req.body;
    const createdTest = await TestServices.createTest(testPayload);

    sendResponse(res, {
        success: true,
        message: "Test created successfully",
        statusCode: 201,
        data: createdTest
    })
});

const getAllTestsController = asyncHandler(async (req, res) => {
    const tests = await TestServices.getAllTests();

    sendResponse(res, {
        success: true,
        message: "Tests retrieved successfully",
        statusCode: 200,
        data: tests,
    })
})

const getTestController = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const test = await TestServices.getTestById(id);

    sendResponse(res, {
        success: true,
        message: "Test retrieved successfully",
        statusCode: 200,
        data: test,
    })
})

const updateTestController = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const updatedPayload = req.body;
    const updatedTest = await TestServices.updateTestById(id, updatedPayload);

    sendResponse(res, {
        success: true,
        message: "Test updated successfully",
        statusCode: 200,
        data: updatedTest,
    })
})

const deleteTestController = asyncHandler(async (req, res) => {
    const id = req.params.id;
    await TestServices.deleteTestById(id);

    sendResponse(res, {
        success: true,
        message: "Test deleted successfully",
        statusCode: 200,
        data: {}
    })
})

export const TestControllers = {
    createTestController,
    getAllTestsController,
    getTestController,
    updateTestController
    deleteTestController,
}