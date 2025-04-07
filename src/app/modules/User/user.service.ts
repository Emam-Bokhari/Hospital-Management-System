/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import { HttpError } from '../../errors/HttpError';
import { Doctor } from '../Doctor/doctor.model';
import { TUser } from './user.interface';
import { User } from './user.model';


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
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // check if user exists
    const user = await User.findById(id).session(session);

    // check if doctor exists
    const doctor = await Doctor.findOne({ userId: id }).session(session);

    // if no user and no doctor throw error
    if (!user && !doctor) {
      throw new HttpError(404, `No user or doctor found with ID:${id}`);
    }

    if (user && !user.isDeleted) {
      await User.findByIdAndUpdate(
        id,
        { isDeleted: true },
        { new: true, runValidators: true, session },
      );
    }

    if (doctor && !doctor.isDeleted) {
      await Doctor.findByIdAndUpdate(
        doctor._id,
        { isDeleted: true },
        { new: true, runValidators: true, session },
      );
    }

    await session.commitTransaction();
    await session.endSession();

    return { message: `Successfully deleted!` };
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new HttpError(500, err.message);
  }
};

export const UserServices = {
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};
