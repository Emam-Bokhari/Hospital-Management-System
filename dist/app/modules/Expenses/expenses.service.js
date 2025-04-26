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
exports.ExpensesServices = exports.getExpensesByType = void 0;
const HttpError_1 = require("../../errors/HttpError");
const staff_model_1 = require("../Staff/staff.model");
const expenses_model_1 = require("./expenses.model");
const createExpenses = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // handle staff salaries
    if (payload.expenseType === "staffSalaries") {
        if (!payload.staff || !payload.staff.staffId) {
            throw new HttpError_1.HttpError(400, "Staff information is required for staff salaries.");
        }
        const staff = yield staff_model_1.Staff.findById(payload.staff.staffId);
        if (!staff) {
            throw new HttpError_1.HttpError(404, "Staff not found.");
        }
        const monthlySalary = ((_a = staff.payrollInformation) === null || _a === void 0 ? void 0 : _a.monthlySalary) || 0;
        const bonusAmount = payload.staff.bonusAmount || 0;
        const deductions = payload.staff.deductions || 0;
        payload.staff.totalPayable = (monthlySalary + bonusAmount) - deductions;
    }
    // handle medical supplies
    if (payload.expenseType === "medicalSupplies") {
        if (!payload.medicalSupplies) {
            throw new HttpError_1.HttpError(400, "Medical supplies information is required.");
        }
        payload.medicalSupplies.totalCost = payload.medicalSupplies.unitPrice * payload.medicalSupplies.quantity;
    }
    // handle diagnostic tools
    if (payload.expenseType === "diagnosticTools") {
        if (!payload.diagnosticTools) {
            throw new HttpError_1.HttpError(400, "Diagnostic tools information is required.");
        }
        payload.diagnosticTools.totalCost = payload.diagnosticTools.unitPrice * payload.diagnosticTools.quantity;
    }
    // handle maintenance
    if (payload.expenseType === "maintenance") {
        if (!payload.maintenance) {
            throw new HttpError_1.HttpError(400, "Maintenance information is required.");
        }
    }
    // handle rent
    if (payload.expenseType === "rent") {
        if (!payload.rent) {
            throw new HttpError_1.HttpError(400, "Rent information is required.");
        }
    }
    // handle marketing
    if (payload.expenseType === "marketing") {
        if (!payload.marketing) {
            throw new HttpError_1.HttpError(400, "Marketing information is required.");
        }
    }
    // handle utility
    if (payload.expenseType === "utility") {
        if (!payload.utility) {
            throw new HttpError_1.HttpError(400, "Utility information is required.");
        }
    }
    // handle government
    if (payload.expenseType === "government") {
        if (!payload.government) {
            throw new HttpError_1.HttpError(400, "Government information is required.");
        }
    }
    // handle others
    if (payload.expenseType === "others") {
        if (!payload.others) {
            throw new HttpError_1.HttpError(400, "Others information is required.");
        }
    }
    const createdExpenses = yield expenses_model_1.Expenses.create(payload);
    // populate dynamically based on expenseType
    let query = expenses_model_1.Expenses.findById(createdExpenses._id);
    if (payload.expenseType === "staffSalaries") {
        query = query.populate("staff.staffId");
    }
    const populatedExpenses = yield query;
    return populatedExpenses;
});
const getAllExpenses = () => __awaiter(void 0, void 0, void 0, function* () {
    const expenses = yield expenses_model_1.Expenses.find();
    if (expenses.length === 0) {
        throw new HttpError_1.HttpError(404, "No expenses were found in the database");
    }
    ;
    return expenses;
});
const getExpensesByType = (type) => __awaiter(void 0, void 0, void 0, function* () {
    const expenses = yield expenses_model_1.Expenses.find({ expenseType: type });
    if (expenses.length === 0) {
        throw new HttpError_1.HttpError(404, `No expenses were found with type ${type}`);
    }
    return expenses;
});
exports.getExpensesByType = getExpensesByType;
const getExpensesById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const expenses = yield expenses_model_1.Expenses.findById(id);
    if (!expenses) {
        throw new HttpError_1.HttpError(404, `No expenses found with ID ${id}`);
    }
    return expenses;
});
const deleteExpensesById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedExpenses = yield expenses_model_1.Expenses.findOneAndUpdate({ _id: id, isDeleted: false }, { isDeleted: true }, { new: true });
    if (!deletedExpenses) {
        throw new HttpError_1.HttpError(404, `No expenses found with ID: ${id}`);
    }
    return deletedExpenses;
});
exports.ExpensesServices = {
    createExpenses,
    getAllExpenses,
    getExpensesByType: exports.getExpensesByType,
    getExpensesById,
    deleteExpensesById,
};
