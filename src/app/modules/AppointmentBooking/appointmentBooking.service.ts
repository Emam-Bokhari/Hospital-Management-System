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


    const createdAppointmentBooking = await AppointmentBooking.create(payload);

    return createdAppointmentBooking;
}

export const AppointmentBookingServices = {
    createAppointmentBooking,
}