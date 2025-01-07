import { TUser } from "./user.interface";
import { User } from "./user.model";

const createUser = async (payload: TUser) => {
    const result = await User.create(payload);

    return result;
}

const getAllUsers = async () => {
    const result = await User.find();
    return result;
}

const getUserById = async (id: string) => {
    const result = await User.findById(id);
    return result;
}

export const UserServices = {
    createUser,
    getAllUsers,
    getUserById,
}