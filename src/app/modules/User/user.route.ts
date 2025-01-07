import express from "express";
import { UserControllers } from "./user.controller";

const router = express.Router();

router.post("/users", UserControllers.createUserController);

router.get("/users", UserControllers.getAllUsersController);

router.get("/users/:id", UserControllers.getUserController);

router.patch("/users/:id", UserControllers.updateUserController);

router.delete("/users/:id", UserControllers.deleteUserController);

export const UserRoutes = router;