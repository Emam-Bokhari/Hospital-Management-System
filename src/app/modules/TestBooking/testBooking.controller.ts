import { asyncHandler } from "../../utils/asyncHandler";
import { sendResponse } from "../../utils/sendResponse";
import { TestBookingServices } from "./testBooking.service";

const createTestBooking = asyncHandler(async (req, res) => {

    const testBookingPayload = req.body;

    const createdTestBooking = await TestBookingServices.createTestBooking(testBookingPayload);

    sendResponse(res, {
        success: true,
        message: "Test booking created successfully",
        statusCode: 201,
        data: createdTestBooking,
    })
});

export const TestBookingControllers = {
    createTestBooking,
}