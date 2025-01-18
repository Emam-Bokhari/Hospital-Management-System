import { TTestBooking } from "./testBooking.interface";
import { TestBooking } from "./testBooking.model";

const createTestBooking = async (payload: TTestBooking) => {

    // TODO: automatic set userId

    // TODO: auto generate id

    // TODO: payment related validation


    const createdTestBooking = await TestBooking.create(payload);

    return createdTestBooking;
};

export const TestBookingServices = {
    createTestBooking,
}