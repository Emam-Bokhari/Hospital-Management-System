import express from 'express';
import { ExpensesControllers } from './expenses.controller';
import { auth } from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.financeManager, USER_ROLE.admin, USER_ROLE.superAdmin),
  ExpensesControllers.createExpensesController,
);

router.get(
  '/',
  auth(USER_ROLE.financeManager, USER_ROLE.admin, USER_ROLE.superAdmin),
  ExpensesControllers.getAllExpenses,
);

router.get(
  '/type/:type',
  auth(USER_ROLE.financeManager, USER_ROLE.admin, USER_ROLE.superAdmin),
  ExpensesControllers.getExpensesByType,
);

router.get(
  '/:id',
  auth(USER_ROLE.financeManager, USER_ROLE.admin, USER_ROLE.superAdmin),
  ExpensesControllers.getExpensesById,
);

router.delete(
  '/:id',
  auth(USER_ROLE.financeManager, USER_ROLE.admin, USER_ROLE.superAdmin),
  ExpensesControllers.deleteExpensesById,
);

export const ExpensesRoutes = router;
