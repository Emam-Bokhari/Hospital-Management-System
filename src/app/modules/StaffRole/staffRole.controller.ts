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

const getStaffRoleController = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const staffRole = await StaffRoleServices.getStaffRoleById(id);

    sendResponse(res, {
        success: true,
        message: "Staff role retrieved succssfully",
        statusCode: 200,
        data: staffRole,
    })
})

export const StaffRoleControllers = {
    createStaffRoleController,
    getAllStaffRolesController,
    getStaffRoleController,
}