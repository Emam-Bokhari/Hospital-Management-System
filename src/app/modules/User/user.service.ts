import { HttpError } from '../../errors/HttpError';
import { TUser } from './user.interface';
import { User } from './user.model';

const createUser = async (payload: TUser) => {
  const createdUser = await User.create(payload);

  return createdUser;
};

const getAllUsers = async () => {
  const users = await User.find();

  if (users.length === 0) {
    throw new HttpError(404, 'No users were found in the database');
  }

  return users;
};

const getUserById = async (id: string) => {
  const user = await User.findById(id);

  if (!user) {
    throw new HttpError(404, `No user found with ID: ${id}`);
  }

  return user;
};

const updateUserById = async (id: string, payload: Partial<TUser>) => {
  const updatedUser = await User.findOneAndUpdate(
    { _id: id, isDeleted: false },
    payload,
    {
      new: true,
      runValidators: true,
    },
  );

  if (!updatedUser) {
    throw new HttpError(404, `No user found with ID: ${id}`);
  }

  return updatedUser;
};

const deleteUserById = async (id: string) => {
  const deletedUser = await User.findOneAndUpdate(
    { _id: id, isDeleted: false },
    { isDeleted: true },
    { new: true, runValidators: true },
  );

  if (!deletedUser) {
    throw new HttpError(404, `No user found with ID: ${id}`);
  }

  return deletedUser;
};

export const UserServices = {
  createUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};
