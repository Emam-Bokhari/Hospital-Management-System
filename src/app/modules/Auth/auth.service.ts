import { User } from "../User/user.model";
import { TAuth } from "./auth.interface";

const registerUser = async (payload: TAuth) => {
    const registeredUser = await User.create(payload);
    return registeredUser;
}

export const AuthServices = {
    registerUser,
}