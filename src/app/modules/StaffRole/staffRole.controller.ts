import { asyncHandler } from "../../utils/asyncHandler";
import { sendResponse } from "../../utils/sendResponse";
import { StaffRoleServices } from "./staffRole.service";

const createStaffRoleController = asyncHandler(async (req, res) => {
    const staffRolePayload = req.body;
    const createdStaffRole = await StaffRoleServices.createStaffRole(staffRolePayload);

    sendResponse(res, {
        success: true,
        message: "Staff role created successfully",
        statusCode: 201,
        data: createdStaffRole,
    })

})

export const StaffRoleControllers = {
    createStaffRoleController,
}