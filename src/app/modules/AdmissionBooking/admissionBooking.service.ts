import { HttpError } from "../../errors/HttpError";
import { Bed } from "../Bed/bed.model";
import { TAdmissionBooking } from "./admissionBooking.interface";

const createAdmissionBooking = async (payload: TAdmissionBooking) => {
    const bed = await Bed.findById(payload?.bed);
    // check if bed is exists
    if (!bed) {
        throw new HttpError(404, "The requested bed does not exist.");
    }


}