import { Request, Response } from "express";
import { UserServices } from "./user.service";
import { sendResponse } from "../../utils/sendResponse";

const createUserController = async (req: Request, res: Response) => {
    try {
        const userPayload = req.body;
        const createdUser = await UserServices.createUser(userPayload);

        sendResponse(res, {
            statusCode: 201,
            success: true,
            message: "User registered successfully",
            data: createdUser,
        })
    } catch (err) {
        console.log(err);
    }
}

export const UserControllers = {
    createUserController,
}