import express from "express";
import { UserControllers } from "./user.controller";

const router = express.Router();

router.post("/", UserControllers.createUserController);

router.get("/", UserControllers.getAllUsersController);

router.get("/:id", UserControllers.getUserController);

router.patch("/:id", UserControllers.updateUserController);

router.delete("/:id", UserControllers.deleteUserController);

export const UserRoutes = router;