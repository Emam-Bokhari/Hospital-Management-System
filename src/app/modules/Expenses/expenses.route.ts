import express from "express";
import { ExpensesControllers } from "./expenses.controller";

const router = express.Router();

router.post("/", ExpensesControllers.createExpensesController);

router.get("/", ExpensesControllers.getAllExpenses);

router.get("/type/:type", ExpensesControllers.getExpensesByType);

router.get("/:id", ExpensesControllers.getExpensesById);

router.delete("/:id", ExpensesControllers.deleteExpensesById);

export const ExpensesRoutes = router;