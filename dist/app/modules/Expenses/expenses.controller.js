"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpensesControllers = void 0;
const asyncHandler_1 = require("../../utils/global/asyncHandler");
const sendResponse_1 = require("../../utils/global/sendResponse");
const expenses_service_1 = require("./expenses.service");
const createExpensesController = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const expensesPayload = req.body;
    const createdExpenses = yield expenses_service_1.ExpensesServices.createExpenses(expensesPayload);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: 'Expenses created successfully',
        statusCode: 201,
        data: createdExpenses,
    });
}));
const getAllExpenses = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const expenses = yield expenses_service_1.ExpensesServices.getAllExpenses();
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: 'Expenses are retrieved successfully',
        statusCode: 200,
        data: expenses,
    });
}));
const getExpensesByType = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const type = req.params.type;
    const expenses = yield expenses_service_1.ExpensesServices.getExpensesByType(type);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: 'Expenses are retrieved successfully',
        statusCode: 200,
        data: expenses,
    });
}));
const getExpensesById = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const expenses = yield expenses_service_1.ExpensesServices.getExpensesById(id);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: 'Expenses is retrieved successfully',
        statusCode: 200,
        data: expenses,
    });
}));
const deleteExpensesById = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    yield expenses_service_1.ExpensesServices.deleteExpensesById(id);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: "Expenses is deleted successfully",
        statusCode: 200,
        data: {}
    });
}));
exports.ExpensesControllers = {
    createExpensesController,
    getAllExpenses,
    getExpensesByType,
    getExpensesById,
    deleteExpensesById,
};
