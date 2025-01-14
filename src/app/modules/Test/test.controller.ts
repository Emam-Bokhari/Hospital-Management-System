import { asyncHandler } from "../../utils/asyncHandler";
import { sendResponse } from "../../utils/sendResponse";
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

export const TestControllers = {
    createTestController,
}