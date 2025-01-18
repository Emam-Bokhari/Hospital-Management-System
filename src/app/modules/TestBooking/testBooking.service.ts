import { HttpError } from "../../errors/HttpError";
import { TTestBooking } from "./testBooking.interface";
import { TestBooking } from "./testBooking.model";

const createTestBooking = async (payload: TTestBooking) => {

    // TODO: automatic set userId

    // TODO: auto generate id

    // TODO: payment related validation


    const createdTestBooking = await TestBooking.create(payload);

    return createdTestBooking;
};

const getAllTestBookings = async () => {
    const testBookings = await TestBooking.find();

    if (testBookings.length === 0) {
        throw new HttpError(404, "No test bookings were found in the database")
    }
}

export const TestBookingServices = {
    createTestBooking,
    getAllTestBookings,
}