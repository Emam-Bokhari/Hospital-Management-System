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

const getAllStaffRolesController = asyncHandler(async (req, res) => {
    const staffRoles = await StaffRoleServices.getAllStaffRoles();

    sendResponse(res, {
        success: true,
        message: "Staff roles retrieved successfully",
        statusCode: 200,
        data: staffRoles,
    })
})

export const StaffRoleControllers = {
    createStaffRoleController,
    getAllStaffRolesController,
}