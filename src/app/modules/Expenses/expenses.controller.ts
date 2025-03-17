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

const getAllExpenses = asyncHandler(async (req, res) => {
    const expenses = await ExpensesServices.getAllExpenses();
    sendResponse(res, {
        success: true,
        message: 'Expenses are retrieved successfully',
        statusCode: 200,
        data: expenses,
    });
});

const getExpensesByType = asyncHandler(async (req, res) => {
    const type = req.params.type;
    const expenses = await ExpensesServices.getExpensesByType(type);
    sendResponse(res, {
        success: true,
        message: 'Expenses are retrieved successfully',
        statusCode: 200,
        data: expenses,
    });
})

const getExpensesById = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const expenses = await ExpensesServices.getExpensesById(id);
    sendResponse(res, {
        success: true,
        message: 'Expenses is retrieved successfully',
        statusCode: 200,
        data: expenses,
    });
})

export const ExpensesControllers = {
    createExpensesController,
    getAllExpenses,
    getExpensesByType,
    getExpensesById,
}