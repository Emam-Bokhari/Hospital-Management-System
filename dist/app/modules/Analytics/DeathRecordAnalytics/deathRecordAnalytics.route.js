'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.DeathRecordAnalyticsRoutes = void 0;
const express_1 = __importDefault(require('express'));
const deathRecordAnalytics_controller_1 = require('./deathRecordAnalytics.controller');
const router = express_1.default.Router();
router.get(
  '/overview',
  deathRecordAnalytics_controller_1.DeathRecordAnalyticsControllers
    .getDeathRecordsOverviewController,
);
router.get(
  '/monthly-stats',
  deathRecordAnalytics_controller_1.DeathRecordAnalyticsControllers
    .getDeathRecordsMonthlyStatsController,
);
router.get(
  '/causes',
  deathRecordAnalytics_controller_1.DeathRecordAnalyticsControllers
    .getDeathRecordsCausesController,
);
router.get(
  '/gender-stats',
  deathRecordAnalytics_controller_1.DeathRecordAnalyticsControllers
    .getDeathRecordsGenderStatsController,
);
router.get(
  '/age-group-stats',
  deathRecordAnalytics_controller_1.DeathRecordAnalyticsControllers
    .getDeathRecordsAgeGroupStatsController,
);
exports.DeathRecordAnalyticsRoutes = router;
