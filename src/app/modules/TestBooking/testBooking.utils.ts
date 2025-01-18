import { generateDynamicId } from "../../utils/generateDynamicId"
import { TestBooking } from "./testBooking.model"

export const generateTestBookingId = async () => {
    const testBookingId = await generateDynamicId(TestBooking, "TST")
    return testBookingId;
}