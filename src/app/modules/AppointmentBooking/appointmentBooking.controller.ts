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

export const AppointmentBookingControllers = {
    createAppointmentBookingController,
}