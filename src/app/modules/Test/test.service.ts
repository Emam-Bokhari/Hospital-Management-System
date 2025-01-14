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

export const TestServices = {
    createTest,
    getAllTests,
    getTestById,
}