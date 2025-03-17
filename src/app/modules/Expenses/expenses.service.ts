import { TExpenses } from "./expenses.interface";
import { Expenses } from "./expenses.model";

const createExpenses = async (payload: TExpenses) => {
    const createdExpenses = await Expenses.create(payload);

    return createdExpenses;
}

export const ExpensesServices = {
    createExpenses,
}