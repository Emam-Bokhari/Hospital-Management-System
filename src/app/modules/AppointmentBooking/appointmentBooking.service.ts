import { HttpError } from "../../errors/HttpError";
import { Doctor } from "../Doctor/doctor.model";
import { TAppointmentBooking } from "./appointmentBooking.interface";
import { AppointmentBooking } from "./appointmentBooking.model";

const createAppointmentBooking = async (payload: TAppointmentBooking) => {

    // check if doctor is exist
    const doctor = await Doctor.findOne({ _id: payload.doctor }).select("_id").lean();

    if (!doctor) {
        throw new HttpError(404, "Doctor not found")
    }

    // TODO: check if payment is exist


    // TODO: generate automatic appointment booking ID

    // TODO: check doctor time

    const createdAppointmentBooking = await AppointmentBooking.create(payload);

    return createdAppointmentBooking;
}

const getAllAppointmentBookings = async () => {
    const appointmentBookings = await AppointmentBooking.find();

    if (appointmentBookings.length === 0) {
        throw new HttpError(404, 'No appointment bookings were found in the database');
    }

    return appointmentBookings;
}

const getAppointmentBookingById = async (id: string) => {
    const appointmentBooking = await AppointmentBooking.findById(id);

    if (!appointmentBooking) {
        throw new HttpError(404, `No appointment booking found with ID: ${id}`)
    }

    return appointmentBooking;
}


const updateAppointmentBookingStatusById = async (id: string, status: string) => {

    // validating the status
    const validStatuses = ["pending", "confirmed", "completed", "cancelled"];

    if (!validStatuses.includes(status)) {
        throw new HttpError(400, `Invalid status: ${status}`)
    }

    // check if appointment booking is exist
    const appointmentBooking = await AppointmentBooking.findById(id).select("_id doctor");

    if (!appointmentBooking) {
        throw new HttpError(404, `Appointment booking with ID: ${id} not found`)
    }

    // check if the doctor is authenticate
    // if (appointmentBooking.doctor.toString() !== userId) {
    //     throw new HttpError(403, "You are not authorized to update this appointment")
    // };

    // if the status is confirmed
    // if (status === "confirmed") {
    //     if (!appointmentBooking.payment) {
    //         throw new HttpError(400, "Payment ID is missing for this appointment")
    //     }

    //     // check the payment status
    //     const payment = await Payment.findById(appointmentBooking.payment);

    //     if (!payment) {
    //         throw new HttpError(404, "Payment not found")
    //     };

    //     if (payment.status !== "confirmed") {
    //         throw new HttpError(400, "Payment has not been confirmed.")
    //     }
    // }

    const updatedAppointmentBookingStatus = await AppointmentBooking.findByIdAndUpdate(id, { status }, { new: true });

    return updatedAppointmentBookingStatus;


}




export const AppointmentBookingServices = {
    createAppointmentBooking,
    getAllAppointmentBookings,
    getAppointmentBookingById,
    updateAppointmentBookingStatusById,
}