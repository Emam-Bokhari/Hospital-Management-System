import { HttpError } from "../../errors/HttpError";
import { TUser } from "../User/user.interface";
import { User } from "../User/user.model";
import { TLoginUser } from "./auth.interface";

const registerUser = async (payload: TUser) => {

    // check if user is exists
    const existingUser = await User.isUserExists(payload.email);
    if (existingUser) {
        throw new HttpError(
            400,
            `A user with the email '${payload.email}' already exists. Please use a different email.`,
        );
    }

    const registeredUser = await User.create(payload);
    return registeredUser;
}

const loginUser = async (payload: TLoginUser) => {
    // if email is not provided, throw an error
    if (!payload.email) {
        throw new HttpError(400, "Email must be provided");
    }

    // check if the user is exists
    const user = await User.isUserExists(payload.email)
    if (!user) {
        throw new HttpError(400, "User not found!")
    }

    // check if the user is already deleted
    if (user.isDeleted) {
        throw new HttpError(404, "The user is already deleted!")
    }

    // check if the user is already suspend
    if (user.status === "suspend") {
        throw new HttpError(403, "The user account is suspended")
    }


}

export const AuthServices = {
    registerUser,
}