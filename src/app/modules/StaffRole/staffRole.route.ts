import express from "express";
import { StaffRoleControllers } from "./staffRole.controller";

const router = express.Router();

router.post("/", StaffRoleControllers.createStaffRoleController);

router.get("/", StaffRoleControllers.getAllStaffRolesController);

router.get("/:id", StaffRoleControllers.getStaffRoleController);

router.patch("/:id", StaffRoleControllers.updateStaffRoleController);

router.delete("/:id", StaffRoleControllers.deleteStaffRoleController)


export const StaffRoleRoutes = router;