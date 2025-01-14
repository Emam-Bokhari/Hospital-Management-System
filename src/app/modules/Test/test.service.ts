import { TTest } from "./test.interface";
import { Test } from "./test.model";

const createTest = async (payload: TTest) => {
    const createdTest = await Test.create(payload);

    return createdTest;
}

export const TestServices = {
    createTest,
}