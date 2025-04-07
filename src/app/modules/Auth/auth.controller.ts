import { asyncHandler } from "../../utils/global/asyncHandler";
import { sendResponse } from "../../utils/global/sendResponse";
import { AuthServices } from "./auth.service";

const registerUserController = asyncHandler(async (req, res) => {
    const registerUserPayload = req.body;
    const registeredUser = await AuthServices.registerUser(registerUserPayload)

    sendResponse(res, {
        success: true,
        message: "User registered successfully",
        statusCode: 200,
        data: registeredUser,
    })
})

const loginUserController = asyncHandler(async (req, res) => {
    const loginUserPayload = req.body;
    const loggedInUser = await AuthServices.loginUser(loginUserPayload);

    sendResponse(res, {
        success: true,
        message: "User login successfully",
        statusCode: 200,
        data: loggedInUser,
    })
})

export const AuthControllers = {
    registerUserController,
    loginUserController,
}