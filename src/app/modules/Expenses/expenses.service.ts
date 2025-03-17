import { HttpError } from "../../errors/HttpError";
import { TExpenses } from "./expenses.interface";
import { Expenses } from "./expenses.model";

const createExpenses = async (payload: TExpenses) => {
    const createdExpenses = await Expenses.create(payload);

    return createdExpenses;
}

const getAllExpenses = async () => {
    const expenses = await Expenses.find();
    if (expenses.length === 0) {
        throw new HttpError(404, "No expenses were found in the database")
    };

    return expenses;
}

const getExpensesById = async (id: string) => {
    const expenses = await Expenses.findById(id);

    if (!expenses) {
        throw new HttpError(404, `No expenses found with ID ${id}`);
    }

    return expenses;
}

const deleteExpensesById = async (id: string) => {
    const deletedExpenses = await Expenses.findOneAndUpdate(
        { _id: id, isDeleted: false },
        { isDeleted: true },
        { new: true },
    );
    if (!deletedExpenses) {
        throw new HttpError(404, `No expenses found with ID: ${id}`);
    }
    return deletedExpenses;
};

export const ExpensesServices = {
    createExpenses,
    getAllExpenses,
    getExpensesById,
    deleteExpensesById,
}