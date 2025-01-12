import express from "express";
import { DepartmentControllers } from "./department.controller";

const router = express.Router();

router.post("/", DepartmentControllers.createDepartmentController);

router.get("/", DepartmentControllers.getAllDepartmentsController);

router.get("/:id", DepartmentControllers.getDepartmentController);

router.patch("/:id", DepartmentControllers.updateDepartmentController)

router.delete("/:id", DepartmentControllers.deleteDepartmentController)

export const DepartmentRoutes = router;