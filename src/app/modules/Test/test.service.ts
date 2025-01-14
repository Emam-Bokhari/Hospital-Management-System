import { HttpError } from "../../errors/HttpError";
import { TTest } from "./test.interface";
import { Test } from "./test.model";

const createTest = async (payload: TTest) => {
    const createdTest = await Test.create(payload);

    return createdTest;
}

const getAllTests = async () => {
    const tests = await Test.find();

    if (tests.length === 0) {
        throw new HttpError(404, 'No tests were found in the database')
    }
    return tests;
}

const getTestById = async (id: string) => {
    const test = await Test.findById(id);

    if (!test) {
        throw new HttpError(404, `No test found with ID:${id}`)
    }

    return test;
}

const updateTestById = async (id: string, payload: Partial<TTest>) => {

    const updatedTest = await Test.findOneAndUpdate({ _id: id, isDeleted: false }, payload, { new: true, runValidators: true });

    if (!updatedTest) {
        throw new HttpError(404, `No test found with ID:${id}`)
    }

    return updatedTest;
}

const deleteTestById = async (id: string) => {

    const deletedTest = await Test.findOneAndUpdate({ _id: id, isDeleted: false }, { isDeleted: true }, { new: true });

    if (!deletedTest) {
        throw new HttpError(404, `No test found with ID:${id}`)
    }
}

export const TestServices = {
    createTest,
    getAllTests,
    getTestById,
    updateTestById,
    deleteTestById,
}