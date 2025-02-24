import { HttpError } from "../../errors/HttpError";
import { Bed } from "../Bed/bed.model";
import { TAdmissionBooking } from "./admissionBooking.interface";
import { AdmissionBooking } from "./admissionBooking.model";
import { generateAdmissionBookingId } from "./admissionBooking.utils";

const createAdmissionBooking = async (payload: TAdmissionBooking) => {
    const bed = await Bed.findById(payload?.bed);
    // check if bed is exists
    if (!bed) {
        throw new HttpError(404, "The specified bed could not be found.");
    }

    // check if bed is available
    if (bed.availabilityStatus && ["occupied", "maintenance"].includes(bed.availabilityStatus)) {
        const statusMessage = bed.availabilityStatus === "occupied"
            ? "The selected bed is currently occupied."
            : "The selected bed is under maintenance.";
        throw new HttpError(400, statusMessage);
    }

    // generate admission booking id
    const admissionBookingId = await generateAdmissionBookingId();
    payload.id = admissionBookingId;

    const createdAdmissionBooking = await AdmissionBooking.create(payload)

    return createdAdmissionBooking;

}

export const AdmissionBookingServices = {
    createAdmissionBooking,
}