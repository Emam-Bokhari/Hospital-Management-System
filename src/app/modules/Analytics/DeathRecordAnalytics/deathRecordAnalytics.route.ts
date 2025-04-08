import express from 'express';
import { DeathRecordAnalyticsControllers } from './deathRecordAnalytics.controller';
import { auth } from '../../../middlewares/auth';
import { USER_ROLE } from '../../User/user.constant';

const router = express.Router();

router.get(
  '/overview',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  DeathRecordAnalyticsControllers.getDeathRecordsOverviewController,
);

router.get(
  '/monthly-stats',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  DeathRecordAnalyticsControllers.getDeathRecordsMonthlyStatsController,
);

router.get(
  '/causes',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  DeathRecordAnalyticsControllers.getDeathRecordsCausesController,
);

router.get(
  '/gender-stats',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  DeathRecordAnalyticsControllers.getDeathRecordsGenderStatsController,
);

router.get(
  '/age-group-stats',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  DeathRecordAnalyticsControllers.getDeathRecordsAgeGroupStatsController,
);

export const DeathRecordAnalyticsRoutes = router;
