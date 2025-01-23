import express from "express";
import { DeathRecordAnalyticsControllers } from "./deathRecordAnalytics.controller";

const router = express.Router();

router.get("/overview", DeathRecordAnalyticsControllers.getDeathRecordsOverviewController)

router.get("/monthly-stats", DeathRecordAnalyticsControllers.getDeathRecordsMonthlyStatsController)

router.get("/causes", DeathRecordAnalyticsControllers.getDeathRecordsCausesController)

router.get("/gender-stats", DeathRecordAnalyticsControllers.getDeathRecordsGenderStatsController)

export const DeathRecordAnalyticsRoutes = router;