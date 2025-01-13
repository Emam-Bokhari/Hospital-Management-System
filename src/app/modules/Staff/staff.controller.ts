import { asyncHandler } from "../../utils/asyncHandler";
import { sendResponse } from "../../utils/sendResponse";
import { StaffServices } from "./staff.service";

const createStaffController = asyncHandler(async (req, res) => {
    const staffPayload = req.body;
    const createdStaff = await StaffServices.createStaff(staffPayload);

    sendResponse(res, {
        success: true,
        message: "Staff created successfully",
        statusCode: 201,
        data: createdStaff,
    })
})

export const StaffControllers = {
    createStaffController,
}