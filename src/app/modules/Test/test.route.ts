import express from "express";
import { TestControllers } from "./test.controller";

const router = express.Router();

router.post("/", TestControllers.createTestController);

router.get("/", TestControllers.getAllTestsController);

router.get("/:id", TestControllers.getTestController);

router.patch("/:id", TestControllers.updateTestController);

router.patch("/:id/availability", TestControllers.updateTestAvailabilityController)

router.delete("/:id", TestControllers.deleteTestController)

export const TestRoutes = router;