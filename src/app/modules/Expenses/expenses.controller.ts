import { asyncHandler } from "../../utils/global/asyncHandler";
import { sendResponse } from "../../utils/global/sendResponse";
import { ExpensesServices } from "./expenses.service";

const createExpensesController = asyncHandler(async (req, res) => {
    const expensesPayload = req.body;
    const createdExpenses = await ExpensesServices.createExpenses(expensesPayload);

    sendResponse(res, {
        success: true,
        message: 'Expenses created successfully',
        statusCode: 201,
        data: createdExpenses,
    });
});

export const getAllExpenses = asyncHandler(async (req, res) => {
    const expenses = await ExpensesServices.getAllExpenses();
    sendResponse(res, {
        success: true,
        message: 'Expenses are retrieved successfully',
        statusCode: 200,
        data: expenses,
    });
});

export const ExpensesControllers = {
    createExpensesController,
    getAllExpenses,
}