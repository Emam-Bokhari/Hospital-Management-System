import { asyncHandler } from "../../utils/asyncHandler";
import { sendResponse } from "../../utils/sendResponse";
import { TestBookingServices } from "./testBooking.service";

const createTestBookingController = asyncHandler(async (req, res) => {

    const testBookingPayload = req.body;

    const createdTestBooking = await TestBookingServices.createTestBooking(testBookingPayload);

    sendResponse(res, {
        success: true,
        message: "Test booking created successfully",
        statusCode: 201,
        data: createdTestBooking,
    })
});

const getAllTestBookingsController = asyncHandler(async (req, res) => {
    const testBookings = await TestBookingServices.getAllTestBookings();

    sendResponse(res, {
        success: true,
        message: "Test bookings retrieved successfully",
        statusCode: 200,
        data: testBookings
    })
})

const testBookingController = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const testBooking = await TestBookingServices.getTestBookingById(id);

    sendResponse(res, {
        success: true,
        message: "Test booking retrieved successfully",
        statusCode: 200,
        data: testBooking,
    })
})

const updateTestBookingStatusController = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const { status } = req.body;

    const updatedTestBookingStatus = await TestBookingServices.updateTestBookingStatusById(id, status);

    sendResponse(res, {
        success: true,
        message: "Test booking status updated",
        statusCode: 200,
        data: updatedTestBookingStatus,
    })
})


export const TestBookingControllers = {
    createTestBookingController,
    getAllTestBookingsController,
    testBookingController,
    updateTestBookingStatusController,
}