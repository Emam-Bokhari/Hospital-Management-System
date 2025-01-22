import express from "express";
import { DeathRecordAnalyticsControllers } from "./deathRecordAnalytics.controller";

const router = express.Router();

router.get("/overview", DeathRecordAnalyticsControllers.getDeathRecordsOverviewController)

export const DeathRecordAnalyticsRoutes = router;