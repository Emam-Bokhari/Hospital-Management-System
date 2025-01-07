import { TUser } from './user.interface';
import { User } from './user.model';

const createUser = async (payload: TUser) => {
  const result = await User.create(payload);

  return result;
};

const getAllUsers = async () => {
  const result = await User.find();
  return result;
};

const getUserById = async (id: string) => {

  const result = await User.findById(id);

  if (!result) {
    throw new Error(`No user found with ID: ${id}`);
  }

  return result;
};

const updateUserById = async (id: string, payload: Partial<TUser>) => {

  const result = await User.findOneAndUpdate({ _id: id, isDeleted: false }, payload, {
    new: true,
    runValidators: true,
  });

  if (!result) {
    throw new Error(`No user found with ID: ${id}`)
  }

  return result;
};

const deleteUserById = async (id: string) => {
  const result = await User.findOneAndUpdate(
    { _id: id, isDeleted: false },
    { isDeleted: true },
    { new: true, runValidators: true },
  );

  if (!result) {
    throw new Error(`No user found with ID: ${id}`)
  }

  return result;
};

export const UserServices = {
  createUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};
