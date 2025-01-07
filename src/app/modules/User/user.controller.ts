import { Request, Response } from "express";
import { UserServices } from "./user.service";

const createUserController = async (req: Request, res: Response) => {
    try {
        const userPayload = req.body;
        const createdUser = await UserServices.createUser(userPayload);

        res.send({
            success: true,
            message: "User successfully registered",
            statusCode: 201,
            data: createdUser,
        })
    } catch (err) {
        console.log(err);
    }
}

export const UserControllers = {
    createUserController,
}