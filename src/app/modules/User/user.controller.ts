import { UserServices } from "./user.service";
import { sendResponse } from "../../utils/sendResponse";
import { asyncHandler } from "../../utils/asyncHandler";

const createUserController = asyncHandler(async (req, res) => {

    const userPayload = req.body;
    const createdUser = await UserServices.createUser(userPayload);

    sendResponse(res, {
        success: true,
        message: "User registered successfully",
        statusCode: 201,
        data: createdUser,
    })

}
)

const getAllUsersController = asyncHandler(async (req, res) => {
    const users = await UserServices.getAllUsers();

    sendResponse(res, {
        success: true,
        message: "Users retrieved successfully",
        statusCode: 200,
        data: users,
    })
})

const getUserController = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const user = await UserServices.getUserById(id);

    sendResponse(res, {
        success: true,
        message: "User retrieved successfully",
        statusCode: 200,
        data: user,
    })
})

const updateUserController = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const updatedPayload = req.body;
    const updatedUser = await UserServices.updateUserById(id, updatedPayload);

    sendResponse(res, {
        success: true,
        message: "User updated successfully",
        statusCode: 200,
        data: updatedUser,
    })
})

const deleteUserController = asyncHandler(async (req, res) => {
    const id = req.params.id;
    await UserServices.deleteUserById(id);

    sendResponse(res, {
        success: true,
        message: "User deleted successfully",
        statusCode: 200,
        data: {}
    })


})

export const UserControllers = {
    createUserController,
    getAllUsersController,
    getUserController,
    updateUserController,
    deleteUserController,
}