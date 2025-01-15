import { asyncHandler } from "../../utils/asyncHandler";
import { sendResponse } from "../../utils/sendResponse";
import { AppointmentBookingServices } from "./appointmentBooking.service";

const createAppointmentBookingController = asyncHandler(async (req, res) => {
    const appointmentBookingPayload = req.body;
    const createdAppointmentBooking = await AppointmentBookingServices.createAppointmentBooking(appointmentBookingPayload);

    sendResponse(res, {
        success: true,
        message: "Appointment booking created successfully",
        statusCode: 201,
        data: createdAppointmentBooking,
    })
})

const getAllAppointmentBookingsController = asyncHandler(async (req, res) => {
    const appointmentBookings = await AppointmentBookingServices.getAllAppointmentBookings();

    sendResponse(res, {
        success: true,
        message: "Appointment bookings retrieved successfully",
        statusCode: 200,
        data: appointmentBookings
    })
})

const getAppointmentBookingController = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const appointmentBooking = await AppointmentBookingServices.getAppointmentBookingById(id);

    sendResponse(res, {
        success: true,
        message: "Appointment booking retrieved successfully",
        statusCode: 200,
        data: appointmentBooking
    })
})


export const AppointmentBookingControllers = {
    createAppointmentBookingController,
    getAllAppointmentBookingsController,
    getAppointmentBookingController,
}