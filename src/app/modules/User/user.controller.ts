import { UserServices } from "./user.service";
import { sendResponse } from "../../utils/sendResponse";
import { asyncHandler } from "../../utils/asyncHandler";

const createUserController = asyncHandler(async (req, res) => {

    const userPayload = req.body;
    const createdUser = await UserServices.createUser(userPayload);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "User registered successfully",
        data: createdUser,
    })

}
)
export const UserControllers = {
    createUserController,
}