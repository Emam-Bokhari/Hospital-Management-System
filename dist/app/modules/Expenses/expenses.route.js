'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.ExpensesRoutes = void 0;
const express_1 = __importDefault(require('express'));
const expenses_controller_1 = require('./expenses.controller');
const router = express_1.default.Router();
router.post(
  '/',
  expenses_controller_1.ExpensesControllers.createExpensesController,
);
router.get('/', expenses_controller_1.ExpensesControllers.getAllExpenses);
router.get(
  '/type/:type',
  expenses_controller_1.ExpensesControllers.getExpensesByType,
);
router.get('/:id', expenses_controller_1.ExpensesControllers.getExpensesById);
router.delete(
  '/:id',
  expenses_controller_1.ExpensesControllers.deleteExpensesById,
);
exports.ExpensesRoutes = router;
