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

    //TODO: check if payment is exist


    //TODO: generate automatic appointment booking ID

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

export const AppointmentBookingServices = {
    createAppointmentBooking,
    getAllAppointmentBookings,
    getAppointmentBookingById,
}