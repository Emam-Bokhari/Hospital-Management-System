import express from "express";
import { DeathRecordAnalyticsControllers } from "./deathRecordAnalytics.controller";

const router = express.Router();

router.get("/overview", DeathRecordAnalyticsControllers.getDeathRecordsOverviewController)

router.get("/monthly-stats", DeathRecordAnalyticsControllers.getDeathRecordsMonthlyStatsController)

router.get("/causes", DeathRecordAnalyticsControllers.getDeathRecordsCausesController)

export const DeathRecordAnalyticsRoutes = router;