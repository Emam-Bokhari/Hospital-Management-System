import { HttpError } from '../../errors/HttpError';
import { Staff } from '../Staff/staff.model';
import { TExpenses } from './expenses.interface';
import { Expenses } from './expenses.model';

const createExpenses = async (payload: TExpenses) => {
  // handle staff salaries
  if (payload.expenseType === 'staffSalaries') {
    if (!payload.staff || !payload.staff.staffId) {
      throw new HttpError(
        400,
        'Staff information is required for staff salaries.',
      );
    }

    const staff = await Staff.findById(payload.staff.staffId);

    if (!staff) {
      throw new HttpError(404, 'Staff not found.');
    }

    const monthlySalary = staff.payrollInformation?.monthlySalary || 0;
    const bonusAmount = payload.staff.bonusAmount || 0;
    const deductions = payload.staff.deductions || 0;
    payload.staff.totalPayable = monthlySalary + bonusAmount - deductions;
  }

  // handle medical supplies
  if (payload.expenseType === 'medicalSupplies') {
    if (!payload.medicalSupplies) {
      throw new HttpError(400, 'Medical supplies information is required.');
    }
    payload.medicalSupplies.totalCost =
      payload.medicalSupplies.unitPrice * payload.medicalSupplies.quantity;
  }

  // handle diagnostic tools
  if (payload.expenseType === 'diagnosticTools') {
    if (!payload.diagnosticTools) {
      throw new HttpError(400, 'Diagnostic tools information is required.');
    }
    payload.diagnosticTools.totalCost =
      payload.diagnosticTools.unitPrice * payload.diagnosticTools.quantity;
  }

  // handle maintenance
  if (payload.expenseType === 'maintenance') {
    if (!payload.maintenance) {
      throw new HttpError(400, 'Maintenance information is required.');
    }
  }

  // handle rent
  if (payload.expenseType === 'rent') {
    if (!payload.rent) {
      throw new HttpError(400, 'Rent information is required.');
    }
  }

  // handle marketing
  if (payload.expenseType === 'marketing') {
    if (!payload.marketing) {
      throw new HttpError(400, 'Marketing information is required.');
    }
  }

  // handle utility
  if (payload.expenseType === 'utility') {
    if (!payload.utility) {
      throw new HttpError(400, 'Utility information is required.');
    }
  }

  // handle government
  if (payload.expenseType === 'government') {
    if (!payload.government) {
      throw new HttpError(400, 'Government information is required.');
    }
  }

  // handle others
  if (payload.expenseType === 'others') {
    if (!payload.others) {
      throw new HttpError(400, 'Others information is required.');
    }
  }

  const createdExpenses = await Expenses.create(payload);

  // populate dynamically based on expenseType
  let query = Expenses.findById(createdExpenses._id);

  if (payload.expenseType === 'staffSalaries') {
    query = query.populate('staff.staffId');
  }

  const populatedExpenses = await query;

  return populatedExpenses;
};

const getAllExpenses = async () => {
  const expenses = await Expenses.find();
  if (expenses.length === 0) {
    throw new HttpError(404, 'No expenses were found in the database');
  }

  return expenses;
};

export const getExpensesByType = async (type: string) => {
  const expenses = await Expenses.find({ expenseType: type });

  if (expenses.length === 0) {
    throw new HttpError(404, `No expenses were found with type ${type}`);
  }

  return expenses;
};

const getExpensesById = async (id: string) => {
  const expenses = await Expenses.findById(id);

  if (!expenses) {
    throw new HttpError(404, `No expenses found with ID ${id}`);
  }

  return expenses;
};

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
  getExpensesByType,
  getExpensesById,
  deleteExpensesById,
};
